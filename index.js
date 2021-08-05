require("dotenv").config();
const express = require("express");
const cors = require("cors");
var cron = require("node-cron");

const { fetchVideos } = require("./schedulers/ytFetch");
const { bulkInsert } = require("./utils/es");
const { videos } = require("./routes/video");

// Runs a fetch every minute
// updates lastLatest video to
// prev latest video's publishedAt timestamp
// next request goes to fetch latest videos
let cc = 0;
let lastLatest = "2021-02-01T00:00:00Z";
const task = cron.schedule("* * * * *", async () => {
  console.log("cron job: ", ++cc);
  const [res, err] = await fetchVideos(lastLatest);
  if (res) {
    bulkInsert(res);
    lastLatest = res.items[0].snippet.publishedAt;
  } else if (err) {
    console.error(err);
    // can stop tasks, if failing
    // task.stop();
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
      "Hi 👋🏻, welcome to the YT Search API, go to /api/video/search?q=music&s=3&p=1",
  });
});

app.use("/api/video", videos);

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
