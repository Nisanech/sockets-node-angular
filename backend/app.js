const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origins: ["http://localhost:8100"],
  },
});

const { fetchDataFromAPI, getData } = require("./models/dataModel");

app.use(cors());

io.on("connection", async (socket) => {
  try {
    console.log("hola ! socket");
    await fetchDataFromAPI();
    clientesData = getData(); // Almacena la data obtenida en la variable global

    socket.emit("listarClientes", clientesData); // Envía la data a través del socket
  } catch (error) {
    console.error("Error handling API data:", error.message);
  }
});

server.listen(port, () => {
  console.log("Server started!");
});
