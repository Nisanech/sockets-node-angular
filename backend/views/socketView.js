const io = require("socket.io");

let connectedSocket;

function initializeSocket(server) {
  const socketIO = io(server);

  socketIO.on("connection", (socket) => {
    console.log("Socket connected!");
    connectedSocket = socket;
  });
}

function emitDataViaSocket(data) {
  if (connectedSocket) {
    connectedSocket.emit("listarClientes", { data }); // Aquí emitimos los datos al evento listarClientes
    connectedSocket.emit("crearClientes", { data }); // Aquí emitimos los datos al evento crearClientes
    console.log("Data obtenida del evento socket:", data);
  }
}

module.exports = {
  initializeSocket,
  emitDataViaSocket,
};
