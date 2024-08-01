const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const multer = require("multer");

// Multer yapılandırması (memoryStorage)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const registerUser = async (req, res) => {
  upload.array("avatars", 10)(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      console.error("Multer error:", err);
      return res.status(500).json({ error: err.message });
    } else if (err) {
      console.error("Unknown error:", err);
      return res.status(500).json({ error: err.message });
    }

    const { name, email, password, bio, location } = req.body;
    const avatars = req.files;

    try {
      // Email adresinin zaten var olup olmadığını kontrol et
      const existingUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (existingUser) {
        return res.status(400).json({ error: "Email address already in use" });
      }

      // Kullanıcıyı veritabanına kaydet
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password,
          bio,
          location,
        },
      });

      // Avatarları veritabanına kaydet
      if (avatars && avatars.length > 0) {
        const avatarData = avatars.map((file) => ({
          url: file.buffer,
          userId: user.id,
        }));

        for (const avatar of avatarData) {
          await prisma.avatar.create({
            data: avatar,
          });
        }
      }

      res.json({ message: "User registered successfully!" });
    } catch (error) {
      console.error("Error saving user to database:", error);
      res.status(500).json({ error: "Error saving user to database" });
    }
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Kullanıcıyı email ile bul ve ilişkili avatarları da getir
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        avatars: true,
      },
    });

    // Kullanıcı ve şifre doğrulaması
    if (user && user.password === password) {
      res.json({ message: "Login successful!", user });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error querying the database:", error);
    res.status(500).json({ error: "Error querying the database" });
  }
};

module.exports = { registerUser, loginUser };
