const jwt = require("../utils/jwt");
//const redisClient = require("../utils/redis");

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verifyToken(token);
    // const cachedToken = await redisClient.getAsync(decoded.userId.toString());

    // if (!cachedToken || cachedToken !== token) {
    //   return res.status(401).json({ error: "Unauthorized" });
    // }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = authenticate;
