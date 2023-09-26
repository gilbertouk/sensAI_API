const { io } = require("../app");

const chatMessages = [
  {
    room: "101_4",
    message: [
      {
        text: "message text",
        name: "User101",
        id: "hGvYmOKTzObiUX_6AAAN0.2241069622896057",
        socketID: "hGvYmOKTzObiUX_6AAAN",
      },
      {
        text: "okay, it's work",
        name: "User4",
        id: "hGvYmOKTzObiUX_6AAAN0.224103239622896057",
        socketID: "hGvYmOKTzObiUX_6AAAN",
      },
    ],
  },
];

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("select_room", (room, sendChatHistory) => {
    socket.join(room);

    const roomMessages = findRoom(room);

    if (roomMessages) {
      sendChatHistory(roomMessages.message);
    }
  });

  socket.on("message", ({ data, room }) => {
    const roomMessages = findRoom(room);
    console.log(data);

    if (roomMessages) {
      roomMessages.message.push(data);
      io.to(room).emit("messageResponse", data);
    }
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
    socket.disconnect();
  });
});

function findRoom(room_id) {
  const room = chatMessages.find((messages) => {
    return messages.room === room_id;
  });

  return room;
}
