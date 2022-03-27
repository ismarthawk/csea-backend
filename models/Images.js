const mongoose = require("mongoose");

const Images = new mongoose.Schema({
    imgUrl: {
        type: String,
        required: [true, "Image URL is required"],
    },
    altText: {
        type: String,
        required: [true, "Alt text is required"],
    },
});

module.exports = mongoose.model("Images", Images);
