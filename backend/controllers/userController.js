require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const multer = require("multer");
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");
const { client } = require("../utils/redis");

// Multer configuration (memoryStorage)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const registerUser = async (req, res) => {
  upload.array("avatars", 10)(req, res, async function (err) {
    if (err) {
      console.error("Multer error:", err);
      return res.status(500).json({ error: err.message });
    }

    const { name, email, password, bio, location } = req.body;
    const avatars = req.files;

    try {
      const existingUser = await prisma.user.findUnique({ where: { email } });

      if (existingUser) {
        return res.status(400).json({ error: "Email address already in use" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: { name, email, password: hashedPassword, bio, location },
      });

      if (avatars && avatars.length > 0) {
        const avatarData = avatars.map((file) => ({
          url: file.buffer.toString("base64"), // Store image as base64 string
          userId: user.id,
        }));

        for (const avatar of avatarData) {
          await prisma.avatar.create({ data: avatar });
        }
      }

      const token = jwt.generateToken(user.id);
      res.json({ message: "User registered successfully!", token, user });
    } catch (error) {
      console.error("Error saving user to database:", error);
      res.status(500).json({ error: "Error saving user to database" });
    }
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { avatars: true },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.generateToken(user.id);
    res.json({
      message: "Login successful!",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error querying the database:", error);
    res.status(500).json({ error: "Error querying the database" });
  }
};

const likeUser = async (req, res) => {
  const { userId, likedUserId } = req.body;

  try {
    const interaction = await prisma.interaction.create({
      data: {
        type: "LIKE",
        fromUser: { connect: { id: userId } },
        toUser: { connect: { id: likedUserId } },
      },
    });

    if (connectedUsers[likedUserId]) {
      connectedUsers[likedUserId].send(
        JSON.stringify({ type: "LIKE", userId })
      );
    }

    res.status(200).send({ success: true });
  } catch (error) {
    console.error("Error saving like to database:", error);
    res.status(500).json({ error: "Error saving like to database" });
  }
};

const dislikeUser = async (req, res) => {
  const { userId, dislikedUserId } = req.body;

  try {
    const interaction = await prisma.interaction.create({
      data: {
        type: "DISLIKE",
        fromUser: { connect: { id: userId } },
        toUser: { connect: { id: dislikedUserId } },
      },
    });

    if (connectedUsers[dislikedUserId]) {
      connectedUsers[dislikedUserId].send(
        JSON.stringify({ type: "DISLIKE", userId })
      );
    }

    res.status(200).send({ success: true });
  } catch (error) {
    console.error("Error saving dislike to database:", error);
    res.status(500).json({ error: "Error saving dislike to database" });
  }
};

const getNearbyUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        avatars: true,
      },
    });

    const result = users.map((user) => ({
      id: user.id,
      name: user.name,
      images: user.avatars.map(
        (avatar) => `data:image/jpeg;base64,${avatar.url.toString("base64")}`
      ), // Convert buffer to base64
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching nearby users:", error);
    res.status(500).json({ error: "Error fetching nearby users" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  likeUser,
  dislikeUser,
  getNearbyUsers,
};
