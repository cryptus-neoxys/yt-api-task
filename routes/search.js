const { Router } = require("express");

const { searchVideos } = require("../controllers/searchController");

const searcher = Router();

searcher.get("/search", searchVideos);

module.exports = {
  searcher,
};
