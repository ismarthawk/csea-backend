const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Schema imports.

const TrendingLinks = require("./models/TrendingLinks");
const UpcomingEvents = require("./models/UpcomingEvents");
const CompletedEvents = require("./models/CompletedEvents");

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
  const events = UpcomingEvents.find().then((events) => {
    list = [];
    events.forEach((event) => {
      const eveDate = new Date(event.time);
      const currDate = new Date();

      if (eveDate < currDate) {
        const compEvent = CompletedEvents({
          title: event.title,
          desc: event.desc,
          time: event.time,
          venue: event.venue,
        });
        compEvent.save();
        UpcomingEvents.deleteOne(
          {
            id: event.id,
          },
          (err) => {
            // console.log(err);
          }
        );
      } else {
        list = [...list, event];
      }
    });
    res.json({
      events: list,
    });
  });
});

app.post("/upcoming-events", (req, res) => {
  const newEvent = UpcomingEvents({
    ...req.body,
    time: new Date(req.body.time),
  });
  newEvent.save((err) => {
    if (err) {
      res.status(400).json({
        success: false,
        error: err.message,
      });
    }
  });
  res.status(200).json({
    success: true,
  });
});

// Route to get the completed Events.
app.get("/completed-events", (req, res) => {
  CompletedEvents.find().then((events) => {
    res.status(200).json({
      events: events,
    });
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
