const mongoose = require("mongoose");

const CompletedEventsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please Add a Name"],
    },
    desc: {
        type: String,
        required: [true, "Please add a Description"],
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
        required: [true, "Please Enter a Venue"],
    },
    mode: {
        type: String,
        default: "Online",
    },
});

module.exports = mongoose.model("CompletedEvents", CompletedEventsSchema);
