const express = require("express");
const router = express.Router();

const upload = require("../middleware/images-upload");

// Schema Imports
const Persons = require("../models/Persons");

const profile = require("./image");

router.use("/profile", profile);

// Route to get all persons.
router.get("/", async (req, res) => {
    try {
        const persons = await Persons.find();
        res.status(200).json({
            persons,
        });
    } catch (error) {
        res.status(400).json({
            errorMessage: error.message,
            message: "Error fetching persons",
        });
    }
});

router.post("/", upload.single("profile"), (req, res) => {
    const newPerson = new Persons({
        ...req.body,
        imgUrl: `http://localhost:${process.env.PORT}/person/profile/${req.file.filename}`,
    });
    newPerson.save((err) => {
        if (err) {
            console.log(err);
            res.status(400).json({
                message: "Error saving person",
            });
        } else {
            res.status(201).json({
                message: "Person saved successfully",
            });
        }
    });
});

module.exports = router;
