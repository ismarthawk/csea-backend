const dotenv = require("dotenv").config({
    path: "./config/config.env",
});
const express = require("express");
const connectDB = require("./config/db");

// Route imports
const event = require("./routes/event");
const link = require("./routes/link");

// connect to DB.
const db = connectDB();

const app = express();
app.use(express.json());

app.use("/event", event);
app.use("/link", link);

const port = process.env.PORT;
app.listen(port, console.log("server running in port", port));
