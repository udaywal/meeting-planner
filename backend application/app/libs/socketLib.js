// library for meeting updates and notifications

let setServer = (server) => {
    const io = require('socket.io')(server);
    // on connect
    io.on('connection', (socket) => { 
      console.log("Socket connected successfully..!");
      socket.on('meeeting-notifications', (data)=>{
        console.log(data + data.userId);
        io.emit(data.userId, data); 
      })
      // on disconnect
      socket.on('disconnect', () => {
        console.log("socket disconnected");
      });
    });
  }
  
  module.exports = {
    setServer: setServer
  }