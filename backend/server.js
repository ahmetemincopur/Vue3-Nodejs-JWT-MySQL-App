const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const interactionRoutes = require("./routes/interactionRoutes");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", interactionRoutes);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const connectedUsers = {};

wss.on("connection", (ws, req) => {
  const userId = req.query.userId;
  connectedUsers[userId] = ws;

  ws.on("close", () => {
    delete connectedUsers[userId];
  });

  ws.on("message", async (message) => {
    const { type, fromUserId, toUserId } = JSON.parse(message);

    if (type === "LIKE" || type === "DISLIKE") {
      const fromUser = await prisma.user.findUnique({
        where: { id: parseInt(fromUserId) },
      });
      const toUser = await prisma.user.findUnique({
        where: { id: parseInt(toUserId) },
      });

      if (toUser && connectedUsers[toUserId]) {
        connectedUsers[toUserId].send(
          JSON.stringify({
            type,
            userId: fromUserId,
            userName: fromUser.name,
          })
        );
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
