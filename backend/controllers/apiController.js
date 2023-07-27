const { fetchDataFromAPI, getData } = require("../models/dataModel");
const { emitDataViaSocket } = require("../views/socketView");

async function handleFetchData(req, res) {
  try {
    await fetchDataFromAPI();
    const data = getData();
    res.json({ data });
  } catch (error) {
    console.error("Error handling API data:", error.message);
    res.status(500).json({ error: "Failed to fetch data from the API" });
  }
}

module.exports = {
  handleFetchData,
};
