//* Importar framework y cors
const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
const axios = require("axios");

//* API
const apiFintech =
  "https://clientescebarfcprod-dot-backend-cebar.uc.r.appspot.com/api/cliente/";

//* Servidor & Cors
const server = require("http").Server(app);

app.use(cors());

const io = require("socket.io")(server, {
  cors: {
    origins: ["http://localhost:8100"],
  },
});

let clientesFintech = []; // Variable para guardar el response de la API

//* Evento Socket
io.on("connection", (socket) => {
  console.log("hola ! socket");

  setInterval(async () => {
    try {
      //* Endpoint API Fintech
      const response = await axios.get(apiFintech);

      //* El response llega como array
      const data = response.data;

      clientesFintech = data;
      // console.log(clientesFintech);

      //* Emitir evento de socket -> este es el que se llama en el front
      socket.emit("listarClientes", {
        data: data,
      });
    } catch (error) {
      console.error("Error al consumir la API:", error.message);
    }
  }, 3000);
});

// Función para emitir el evento en el servidor
function emitDataViaSocket() {
  io.emit("listarClientes", { data: clientesFintech });
  console.log("Data obtenida del evento socket:", clientesFintech);
}

// Endpoint Puente
app.get("/api/data", async (req, res) => {
  try {
    const response = await axios.get(apiFintech);

    const data = response.data;

    clientesFintech = data;

    emitDataViaSocket();

    res.json({ data });
  } catch (error) {
    console.error("Error fetching data from the new API:", error.message);
    res.status(500).json({ error: "Failed to fetch data from the API" });
  }
});

server.listen(port, () => {
  console.log("Server started!");
});
