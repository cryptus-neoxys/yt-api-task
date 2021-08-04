require("dotenv").config();
const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());

app.get("/api", (req, res) => {
  res.send({ message: "Hi 👋🏻" });
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
