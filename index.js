require("dotenv").config();
const express = require("express");
const cors = require("cors");
var cron = require("node-cron");

const { fetchVideos } = require("./schedulers/yt-fetch");
const { bulkInsert } = require("./utils/es/insert");
const { videos } = require("./routes/video");

// Runs a fetch every minute
let cc = 0;
let lastLatest = "2021-02-01T00:00:00Z";
const task = cron.schedule("0 */2 * * *", async () => {
  console.log("cron job: ", ++cc);
  const [res, err] = await fetchVideos(lastLatest);
  if (res) {
    bulkInsert(res);
    lastLatest = res.items[0].snippet.publishedAt;
  } else if (err) {
    console.error(err);
    task.stop();
  }
});

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());
app.enable("trust proxy");

app.get("/api", (req, res) => {
  res.send({
    message:
      "Hi 👋🏻, welcome to the YT Search API, go to /api/video/search?q=musics=3&p=1",
  });
});

app.use("/api/video", videos);

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
