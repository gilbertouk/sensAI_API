const { io } = require("./app");

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});
