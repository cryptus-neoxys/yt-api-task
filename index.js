require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { fetchVideos } = require("./schedulers/yt-fetch");

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.send({ message: "Hi 👋🏻" });
});

app.get("/api/video", async (req, res) => {
  try {
    const [videos, err] = await fetchVideos();
    if (!err) {
      res.send({ videos });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "failed" });
  }
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
