const express = require("express");

const dotenv = require("dotenv");

const server = express();
dotenv.config();

server.get("/", (req, res) => {
  res.send("API is running successfuly");
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
