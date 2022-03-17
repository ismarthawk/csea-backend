const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

router.post("/upload", upload.single("file"), async (req, res) => {
    if (req.file === undefined) {
        return res.send("No file selected");
    }

    const imgUrl = `http://localhost:3000/file/${req.file.filename}`;
    return res.send(imgUrl);
});

module.exports = router;
