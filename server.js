// server.js
const express = require("express");
const axios = require("axios");
const app = express();
const path = require("path");
const port = 3000;

app.use(express.static("public"));

app.get("/status", async (req, res) => {
  try {
    const response = await axios.get(
      "http://213.181.206.201:23004/players.json"
    );

    const infoResponse = await axios.get(
      "http://213.181.206.201:23004/info.json"
    );

    const players = response.data;
    const info = infoResponse.data;
    const maxPlayers = info.vars.sv_maxClients;

    res.json({ playerCount: players.length, maxPlayers: maxPlayers });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch server status" });
  }
});

app.use((req, res, next) => {
  res.status(400).sendFile(path.join(__dirname, "public/error", "400.html"));
});

app.use((req, res, next) => {
  res.status(401).sendFile(path.join(__dirname, "public/error", "401.html"));
});

app.use((req, res, next) => {
  res.status(402).sendFile(path.join(__dirname, "public/error", "402.html"));
});

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "public/error", "404.html"));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
