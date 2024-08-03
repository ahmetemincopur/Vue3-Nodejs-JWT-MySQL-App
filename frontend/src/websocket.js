const socket = new WebSocket("ws://localhost:3000");

socket.onopen = () => {
  console.log("WebSocket connection established");
};

socket.onmessage = (event) => {
  const message = JSON.parse(event.data);
  if (message.type === "LIKE") {
    console.log(`User ${message.userId} liked you`);
  } else if (message.type === "DISLIKE") {
    console.log(`User ${message.userId} disliked you`);
  }
};

socket.onclose = () => {
  console.log("WebSocket connection closed");
};

export default socket;
