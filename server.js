const dotenv = require("dotenv").config({
    path: "./config/config.env",
});
const express = require("express");
const connectDB = require("./config/db");

// Route imports
const event = require("./routes/event");
const link = require("./routes/link");
const gallery = require("./routes/gallery");
const person = require("./routes/person");
const resource = require("./routes/resource");

// connect to DB.
const db = connectDB();

const app = express();
app.use(express.json());

app.use("/link", link);
app.use("/person", person);
app.use("/gallery", gallery);
app.use("/event", event);
app.use("/resource", resource);

app.use("/*", (req, res) => {
    res.status(404).json({
        message: "Page not found",
    });
});

const port = process.env.PORT;
app.listen(port, console.log(`Server running on port ${port}`));
