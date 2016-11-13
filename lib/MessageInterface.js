exports.bindSocketIO = function (server)
{
    const serviceInstance =  require("./Service").instance;
    const messageCenter = require("socket.io")(server).of("/mx-qq");

    messageCenter.on("connection", function (socket) {
        console.log("got a new guy");
        serviceInstance.addSocket(socket);
        socket.emit("get-id", serviceInstance.getUserId());

        socket.on("new-user",(data)=>{
          socket.userId = data.id;
          socket.location_ = data.selectedPoi;
        });

        socket.on("update-location",(data) => {
          console.log(data);
          socket.location_ = data;
        });

        socket.on("post-message", (data) => {
            // 接口定义部分
            console.log(data);
            serviceInstance.broadcastMsg(data,socket.location_);
        });

        socket.on("disconnect", () => {
            console.log("socket is disconnected");
            serviceInstance.removeSocket(socket);
        });
    });
}
