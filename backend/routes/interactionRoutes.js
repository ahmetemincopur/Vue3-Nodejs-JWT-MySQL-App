const express = require("express");
const {
  createInteraction,
  getInteractionsForUser,
} = require("../controllers/interactionController");
const router = express.Router();

router.post("/interactions", createInteraction);
router.get("/interactions/:userId", getInteractionsForUser);

module.exports = router;
