const express = require("express");
const router = express.Router();

// Schema Imports
const Resources = require("../models/Resources");

const upload = require("../middleware/images-upload");

const image = require("./image");
router.use("/image", image);

router.get("/", async (req, res) => {
    try {
        const resources = await Resources.find();
        res.status(200).json({
            resources,
        });
    } catch (error) {
        res.status(400).json({
            errorMessage: error.message,
            message: "Error fetching resources",
        });
    }
});

router.post("/", upload.single("image"), (req, res) => {
    const newResource = new Resources({
        ...req.body,
        imgUrl: `http://localhost:${process.env.PORT}/resource/image/${req.file.filename}`,
    });
    newResource.save((err) => {
        if (err) {
            console.log(err);
            res.status(400).json({
                message: "Error saving resource",
            });
        } else {
            res.status(201).json({
                message: "Resource saved successfully",
            });
        }
    });
});

module.exports = router;
