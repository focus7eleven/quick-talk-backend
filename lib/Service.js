'use strict'
function getRad(d){
    let PI = Math.PI;
    return d*PI/180.0;
}

function calculateDistance(location1,location2){
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
        this.idCounter = 0;
    }

    static getInstance() {
        if (!Service._instance)
        {
            Service._instance = new Service();
        }
        return Service._instance;
    }

    getUserId(){
      this.idCounter = this.idCounter + 1;
      return this.idCounter;
    }

    addSocket(socket){
      this.clients.push(socket);
      console.log(this.clients.length);
    }

    removeSocket(socket){
      this.clients.splice(this.clients.indexOf(socket),1);
      console.log(this.clients.length);
    }

    broadcastMsg(data,currentLocation){
      this.clients.forEach(function(socket){
        let location = socket.location_;
        // let distance = socket.distance_;
        let distance = 1000;
        if(calculateDistance(location,currentLocation) < distance){
          socket.emit("new-message",data);
        }
      });
    }
}

exports.instance = Service.getInstance();
