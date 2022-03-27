const mongoose = require("mongoose");

const upcomingEventsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please Add a Name"],
    },
    desc: {
        type: String,
        required: [true, "Please add a Description"],
    },
    link: {
        type: String,
        required: false,
        default: null,
    },

    imgUrl: {
        type: String,
        required: [true, "Please add an image"],
    },
    time: {
        type: Date,
        required: [true, "Please Enter a Time"],
    },
    venue: {
        type: String,
        default: "Online",
    },
});

module.exports = mongoose.model("UpcomingEvents", upcomingEventsSchema);
