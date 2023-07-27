const axios = require("axios");

const apiFintech =
  "https://clientescebarfcprod-dot-backend-cebar.uc.r.appspot.com/";

let clientesFintech = [];
let nuevoClienteFintech = [];

async function fetchDataFromAPI() {
  try {
    const response = await axios.get(`${apiFintech}api/cliente/`);

    clientesFintech = response.data;

    console.log(clientesFintech);
  } catch (error) {
    console.error("Error al traer la data de la API:", error.message);

    throw new Error("Error desde la API");
  }
}

function getData() {
  return clientesFintech;
}

async function postDataAPI(clienteData) {
  try {
    const response = await axios.post(`${apiFintech}api/cliente/`, clienteData);

    nuevoClienteFintech = response.data;

    console.log(nuevoClienteFintech);
  } catch (error) {
    console.error("Error al crear el cliente:", error.message);
    console.error("Detalles del error:", error.response.data); // Muestra más detalles del error

    throw new Error("Error desde la API");
  }
}

function postData() {
  return nuevoClienteFintech;
}

module.exports = {
  fetchDataFromAPI,
  getData,
  postDataAPI,
  postData,
};
