const express = require("express");
const router = express.Router();
const {
    getTrendingLinks,
    postTrendingLink,
} = require("../controllers/link-controller");

// Route to get the trending Youtube Links
router.get("/", getTrendingLinks);

// Route to post the trending Youtube Links
router.post("/", postTrendingLink);

module.exports = router;
