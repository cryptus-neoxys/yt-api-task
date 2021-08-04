const { axiosInstance } = require("../utils/axiosInstance");

let currKeyIndex = 0;
const API_KEYS = process.env.YT_API_API_KEYS.split(", ");
let key = API_KEYS[currKeyIndex];

const fetchVideos = async () => {
  try {
    const res = await axiosInstance.get(
      `https://www.googleapis.com/youtube/v3/search`,
      {
        params: {
          part: "snippet",
          maxResults: 10,
          publishedAfter: "2021-01-01T0:0:0Z",
          order: "date",
          q: "javascript",
          key,
        },
      }
    );

    console.log(JSON.parse(JSON.stringify(res.data)));
    return [res.data, null];
  } catch (err) {
    console.error(err.data);
    key = API_KEYS[++currKeyIndex];
    if (currKeyIndex <= API_KEYS.length) fetchVideos();
    else return [null, err];
  }
};

module.exports = {
  fetchVideos,
};
