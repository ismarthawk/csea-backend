const express = require("express");
const router = express.Router();

// Schema Imports
const Images = require("../models/Images");

const upload = require("../middleware/images-upload");

const image = require("./image");

router.use("/image", image);

// Route to get all images.
router.get("/", async (req, res) => {
    try {
        const images = await Images.find();
        res.status(200).json({
            images,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            errorMessage: error.message,
            message: "Error fetching images",
        });
    }
});

// Route to post an image.
router.post("/", upload.single("image"), (req, res) => {
    const newImage = new Images({
        ...req.body,
        imgUrl: `http://localhost:${process.env.PORT}/gallery/image/${req.file.filename}`,
    });
    newImage.save((err) => {
        if (err) {
            console.log(err);
            res.status(400).json({
                message: "Error saving image",
            });
        } else {
            res.status(201).json({
                message: "Image saved successfully",
            });
        }
    });
});

module.exports = router;
