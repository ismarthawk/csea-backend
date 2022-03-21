// Schema imports.
const TrendingLinks = require("../models/TrendingLinks");

const getTrendingLinks = (req, res) => {
    TrendingLinks.find()
        .then((links) => {
            res.status(200).send({
                links: links,
            });
        })
        .catch((err) => {
            res.status(400).json({
                error: err.message,
            });
        });
};

const postTrendingLink = (req, res) => {
    TrendingLinks.create(req.body);
    res.status(200).json({
        created: "success",
    });
};

module.exports = {
    getTrendingLinks,
    postTrendingLink,
};
