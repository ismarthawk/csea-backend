const express = require("express");
const router = express.Router();

// Schema Imports
const UpcomingEvents = require("../models/UpcomingEvents");
const CompletedEvents = require("../models/CompletedEvents");

// image upload middleware import
const upload = require("../middleware/poster-upload");

const poster = require("./poster");

router.use("/poster", poster);

// Route to get the upcoming Events.
router.get("/upcoming", (req, res) => {
    const events = UpcomingEvents.find().then((events) => {
        list = [];
        events.forEach((event) => {
            const eveDate = new Date(event.time);
            const currDate = new Date();

            if (eveDate < currDate) {
                const compEvent = CompletedEvents({
                    title: event.title,
                    desc: event.desc,
                    imgUrl: event.imgUrl,
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

// Route to post an upcoming Event.
router.post("/upcoming", upload.single("poster"), async (req, res) => {
    const newEvent = UpcomingEvents({
        ...req.body,
        imgUrl: `http://localhost:3000/event/poster/${req.file.filename}`,
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
router.get("/completed", (req, res) => {
    CompletedEvents.find().then((events) => {
        res.status(200).json({
            events: events,
        });
    });
});

module.exports = router;
