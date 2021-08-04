const { runSearch } = require("../utils/es/search");

const searchVideos = async (req, res) => {
  const searchQuery = req.query.q;
  const pageNumber = req.query.p;
  const pageSize = req.query.s;

  try {
    let result = await runSearch(searchQuery, pageNumber, pageSize);

    // result = result.map(res => )
    res.send({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false });
  }
};

module.exports = {
  searchVideos,
};
