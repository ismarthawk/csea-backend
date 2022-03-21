const express = require("express");
const router = express.Router();

const {
    getUpcomingEvents,
    getCompletedEvents,
    postUpcomingEvent,
} = require("../controllers/event-controller");

// image upload middleware import
const upload = require("../middleware/poster-upload");

const poster = require("./poster");

router.use("/poster", poster);

// Route to get the upcoming Events.
router.get("/upcoming", getUpcomingEvents);

// Route to post an upcoming Event.
router.post("/upcoming", upload.single("poster"), postUpcomingEvent);

// Route to get the completed Events.
router.get("/completed", getCompletedEvents);

module.exports = router;
