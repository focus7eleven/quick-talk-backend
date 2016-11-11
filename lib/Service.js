// 提供有关聊天的逻辑实现
'use strict'
function getRad(d){
    let PI = Math.PI;
    return d*PI/180.0;
}
function calculateDistance(location1,location2){
  // console.log(location1);
    let EARTH_RADIUS = 6378137.0;    //单位M
    let radLat1 = getRad(location1.lat);
    let radLat2 = getRad(location2.lat);
    let a = radLat1 - radLat2;
    let b = getRad(location1.lng) - getRad(location2.lng);
    let s = 2*Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) + Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
    s = s*EARTH_RADIUS;
    s = Math.round(s*10000)/10000.0;
    return s;
}
class Service {
    constructor() {
        this.messageCenter = new Array();
        this.clients = new Array();
    }

    static getInstance() {
        if (!Service._instance)
        {
            Service._instance = new Service();
        }
        return Service._instance;
    }

    saveMessage(message)
    {
        this.messageCenter.push(message);
        // 暂定容量10000条
        while(this.messageCenter.length > 10000)
        {
            this.messageCenter.shift();
        }
    }

    getMessage(location, distance)
    {
        // method waits to be completed;
        return {
            id: "test",
            time: "2016.11.7  8:01:00 ",
            message: "it is a test"
        };
    }

    createMessage(location, id, time, message)
    {
        return { location, id, time, message };
    }

    addSocket(socket){
      this.clients.push(socket);
      console.log(this.clients.length);
    }

    removeSocket(socket){
      this.clients.splice(this.clients.indexOf(socket),1);
      console.log(this.clients.length);
    }

    getSocketNum(){
      return this.clients.length;
    }

    broadcastMsg(data){
      // console.log(this.clients.length+" sdfsdfsdfsdf");
      this.clients.forEach(function(socket){
        let location = socket.location_;
        let distance = socket.distance_;
        // console.log(calculateDistance(location,data.location),distance);
        if(calculateDistance(location,data.location) < distance){
          console.log(data);
          socket.emit("update message",data);
        }
      });
    }
}

exports.instance = Service.getInstance();
