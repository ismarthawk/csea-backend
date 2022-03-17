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
router.post("/", (req, res) => {
    TrendingLinks.create(req.body);
    res.status(200).json({
        created: "success",
    });
});

module.exports = router;
