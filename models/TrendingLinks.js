const mongoose = require("mongoose");

const TrendingLinksSchema = new mongoose.Schema({
  link: {
    type: String,
    required: [true, "please add the link"],
  },
});

module.exports = mongoose.model("TrendingLinks", TrendingLinksSchema);
