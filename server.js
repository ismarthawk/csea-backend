const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Loading the config files.
dotenv.config({
  path: "./config/config.env",
});

// connect to DB.
const db = connectDB();

const app = express();

// Rote to get the upcoming Events.
app.get("/upcoming-events", (req, res) => {
  res.status(400).json({
    success: true,
  });
});

// Route to get the completed Events.
app.get("/completed-events", (req, res) => {
  res.status(400).json({
    success: false,
  });
});

// Route to get the trending Youtube Links
app.get("/trending-links", (req, res) => {
  res.status(400).json({
    count: 199,
  });
});

const port = process.env.PORT;
app.listen(port, console.log("server running in port", port));
