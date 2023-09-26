const { app, http, IO_PORT } = require("./app.js");
const { PORT = 9090 } = process.env;

http.listen(IO_PORT, () => {
  console.log(`Socket.IO listening on ${PORT}`);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
