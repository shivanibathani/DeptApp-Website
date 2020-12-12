module.exports = function (io) {
  //socket.on -> listen for particular custom event and perform action
  //io.on -> The io.on event handler handles connection, disconnection, etc., events in it, using the socket object.
  //io.emit -> sends msg to all connected client
    io.on("connection", (socket) => {
      //custom event using socket.on
      socket.on("refreshPersonalChatRoom", (data) => {
        io.emit("refreshPersonalChatPage", {});
      });
  
      socket.on("refreshPersonalMessages", (data) => {
        io.emit("refreshPersonalMessagePage", {});
      });
  
      socket.on("refresh", (data) => {
        io.emit("refreshPage", {});
      });
    });
  };