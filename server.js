const express = require("express");
const app = express();
const http = require("http").createServer(app);
const PORT = process.env.PORT || 3000;
const fs = require("fs");
var rawData = fs.readFileSync(__dirname + "/responses.json");
var responses = JSON.parse(rawData);

http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("Connected...");
  socket.on("message", (msg) => {
    msg.user = "Bot";
    switch (msg.message) {
      case "Start":
      case "start":
      case "*":
        msg.message = responses.r0;
        break;
      case "1":
        msg.message = responses.r1;
        break;
      case "2":
        msg.message = responses.r2;
        break;
      case "3":
        msg.message = responses.r3;
        break;
      case "4":
        msg.message = responses.r4;
        break;
      default:
        msg.message = responses.r5;
    }
    setTimeout(() => {
      socket.emit("message", msg);
    }, 500);
  });
});
