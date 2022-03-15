const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Schema imports.

const TrendingLinks = require("./models/TrendingLinks");
const UpcomingEvents = require("./models/UpcomingEvents");
const { time } = require("console");

// Loading the config files.
dotenv.config({
  path: "./config/config.env",
});

// connect to DB.
const db = connectDB();

const app = express();
app.use(express.json());

// Rote to get the upcoming Events.
app.get("/upcoming-events", (req, res) => {
  UpcomingEvents.find().then((events) => {
    res.json({
      events: events,
    });
  });
});

app.post("/upcoming-events", (req, res) => {
  UpcomingEvents.create({
    ...req.body,
    time: Date(req.body.time),
  })
    .then(() => {
      //   console.log("new Event Created");
      res.json({
        created: "success",
      });
    })
    .catch((err) => {
      res.json({
        created: "fail",
        error: err.message,
      });
    });
});

// Route to get the completed Events.
app.get("/completed-events", (req, res) => {
  res.status(200).json({
    success: false,
  });
});

// Route to get the trending Youtube Links
app.get("/trending-links", (req, res) => {
  TrendingLinks.find()
    .then((links) => {
      res.status(200).send({
        links: links,
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: err.message,
      });
    });
});

app.post("/trending-links", (req, res) => {
  TrendingLinks.create(req.body);
  res.status(200).json({
    created: "success",
  });
});

const port = process.env.PORT;
app.listen(port, console.log("server running in port", port));
