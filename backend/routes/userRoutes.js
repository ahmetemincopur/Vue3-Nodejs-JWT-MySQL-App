const express = require("express");
const {
  registerUser,
  loginUser,
  likeUser,
  dislikeUser,
  getNearbyUsers,
} = require("../controllers/userController");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/protected", authenticate, (req, res) => {
  res.json({ message: "This is a protected route", userId: req.userId });
});
router.post("/users/like", likeUser);
router.post("/users/dislike", dislikeUser);
router.get("/users/nearby", getNearbyUsers);

module.exports = router;
