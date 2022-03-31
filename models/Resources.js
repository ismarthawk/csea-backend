const mongoose = require("mongoose");

const Resources = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    imgUrl: {
        type: String,
        required: [true, "ImgUrl is required"],
    },
    books: {
        type: [String],
        required: [true, "Books are required"],
    },
    courses: {
        type: [String],
        required: [true, "Courses are required"],
    },
    usefulLinks: {
        type: [String],
        required: [false, "UsefulLinks are required"],
    },
});

module.exports = mongoose.model("Resources", Resources);
