require("dotenv").config();
const express = require("express");
const cors = require("cors");
var cron = require("node-cron");

const { fetchVideos } = require("./schedulers/yt-fetch");
const { bulkInsert } = require("./utils/es/insert");
const { searcher } = require("./routes/search");

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
// bulkInsert();

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.send({ message: "Hi 👋🏻" });
});

app.use("/api", searcher);

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
