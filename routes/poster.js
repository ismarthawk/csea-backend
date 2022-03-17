const router = require("express").Router();
const Grid = require("gridfs-stream");
const mongoose = require("mongoose");

// image upload middleware import
const upload = require("../middleware/poster-upload");

// Variables for GridFS
let gfs, gridfsBucket;

const conn = mongoose.connection;
conn.once("open", () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "fs",
    });
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("fs");
});

// Route to post an event poster.
router.post("/", upload.single("poster"), async (req, res) => {
    if (req.file === undefined) {
        return res.status(400).json({
            success: false,
            message: "No Image Selected",
        });
    }
    const imgUrl = `http://localhost:3000/event/poster/${req.file.filename}`;
    res.status(200).json({
        imgUrl: imgUrl,
    });
});

// Route to get an event poster
router.get("/:filename", async (req, res) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(res);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            error: err.message,
        });
    }
});

// Route to delete an event poster
router.delete("/:filename", async (req, res) => {
    try {
        await gfs.files.deleteOne({ filename: req.params.filename });
        res.status(200).json({
            success: true,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            error: err.message,
        });
    }
});

module.exports = router;
