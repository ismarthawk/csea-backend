const mongoose = require("mongoose");

const TrendingLinksSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true,
  },
});
