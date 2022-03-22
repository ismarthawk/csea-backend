const upload = require("../middleware/poster-upload");
const express = require("express");
const router = express.Router();

// Schema imports.
const TrendingLinks = require("../models/TrendingLinks");

// Route to get the trending Youtube Links
router.get("/", (req, res) => {
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

// Route to post the trending Youtube Links
router.post("/", upload.none(), (req, res) => {
  console.log(req.body);
  TrendingLinks.create(req.body, (err) => {
    if (err) {
      res.status(400).json({
        error: err.message,
      });
    } else {
      res.status(201).send({
        message: "Link added successfully",
      });
    }
  });
});

module.exports = router;
