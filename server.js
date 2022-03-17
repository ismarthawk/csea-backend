const dotenv = require("dotenv").config({
    path: "./config/config.env",
});
const express = require("express");
const Grid = require("gridfs-stream");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

// Route imports
const event = require("./routes/event");
const link = require("./routes/link");

// Variables for GridFS
let gfs, gridfsBucket;

// connect to DB.
const db = connectDB();

const app = express();
app.use(express.json());

const conn = mongoose.connection;
conn.once("open", () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "fs",
    });

    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("fs");
});

app.use("/event", event);
app.use("/link", link);

// Event Poster Routes
app.get("/event/poster/:filename", async (req, res) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(res);
    } catch (error) {
        console.log(error);
        res.send("Event poster not found");
    }
});

app.delete("/file/poster/:filename", async (req, res) => {
    try {
        await gfs.files.deleteOne({ filename: req.params.filename });
        res.send("Successfully Uploaded");
    } catch (error) {
        console.log(error);
        res.send("An Error occurred.");
    }
});

const port = process.env.PORT;
app.listen(port, console.log("server running in port", port));
