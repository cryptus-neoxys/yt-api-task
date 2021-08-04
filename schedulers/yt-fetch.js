const { axiosInstance } = require("../utils/axiosInstance");

let currKeyIndex = 0;
const API_KEYS = process.env.YT_API_API_KEYS.split(", ");
let key = API_KEYS[currKeyIndex];

const fetchVideos = async (lastLatest) => {
  try {
    console.log("fetch video: ");
    const res = await axiosInstance.get(
      `https://www.googleapis.com/youtube/v3/search`,
      {
        params: {
          part: "snippet",
          maxResults: 50,
          publishedAfter: lastLatest,
          order: "date",
          q: "official",
          key,
        },
      }
    );

    // console.trace(res.data);
    return [res.data, null];
  } catch (err) {
    console.error(err.data);
    key = API_KEYS[++currKeyIndex];
    if (currKeyIndex <= API_KEYS.length) return await fetchVideos();
    else return [null, err];
  }
};

module.exports = {
  fetchVideos,
};
