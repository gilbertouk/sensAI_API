const { io } = require("../app");
const {
  getChatMessages,
  patchChatMessages,
  insertNewRoom,
} = require("../models/socketio.models");

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("select_room", async (room, sendChatHistory) => {
    socket.join(room);

    const roomMessages = await getChatMessages(room);

    if (!roomMessages) {
      const createNewRoom = await insertNewRoom(room);
    }

    if (roomMessages) {
      sendChatHistory(roomMessages.messages);
    }
  });

  socket.on("message", async ({ data, room }) => {
    const updatedMessage = await patchChatMessages(room, data);

    if (updatedMessage.modifiedCount) {
      io.to(room).emit("messageResponse", data);
    }
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
    socket.disconnect();
  });
});
