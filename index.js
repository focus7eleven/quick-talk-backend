// const express = require("express");
// const app = express();
//
// const server = require("http").Server(app);
// const SocketServer = require("./lib/MessageInterface");
// SocketServer.bindSocketIO(server);
//
// server.listen(5050);
// back-end test
// app.use(express.static("./test"));

const Server = require("socket.io");
const io = new Server().attach(5050);
const serviceInstance =  require("./lib/Service").instance;
io.on('connection', (socket) => {
  console.log("got a new connection");
  serviceInstance.addSocket(socket);

  socket.on("disconnect", () => {
    console.log("socket is disconnected");
    serviceInstance.removeSocket(socket);
  });

  socket.on("post-message", (data) =>{
    // const messageObject = serviceInstance.createMessage(data.location, data.id, data.time, data.message);
    // serviceInstance.saveMessage(messageObject);
    console.log(data);
  })
});
