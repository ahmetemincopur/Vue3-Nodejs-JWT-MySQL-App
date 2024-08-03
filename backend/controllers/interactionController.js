const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createInteraction = async (req, res) => {
  const { fromUserId, toUserId, type } = req.body;

  try {
    const interaction = await prisma.interaction.create({
      data: {
        type,
        fromUser: { connect: { id: fromUserId } },
        toUser: { connect: { id: toUserId } },
      },
    });

    res.status(201).json(interaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getInteractionsForUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const interactions = await prisma.interaction.findMany({
      where: {
        toUserId: parseInt(userId),
      },
      include: {
        fromUser: true,
      },
    });

    res.status(200).json(interactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createInteraction,
  getInteractionsForUser,
};
