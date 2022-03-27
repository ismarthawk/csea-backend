const mongoose = require("mongoose");

const Persons = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Add a Name"],
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
    },
    designation: {
        type: String,
        required: [true, "Please add a designation"],
    },
    imgUrl: {
        type: String,
        required: [true, "Please add an Profile Image"],
    },
});

module.exports = mongoose.model("Persons", Persons);
