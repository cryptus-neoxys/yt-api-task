# yt-api-task

# Project Goal

To make an API to fetch latest videos sorted in reverse chronological order of their publishing date-time from YouTube for a given tag/search query in a paginated response.

# ✅ Basic Requirements:

- ✅ Server should call the YouTube API continuously in background (async) with some interval (using 1 minute) for fetching the latest videos for a predefined search query and should store the data of videos (specifically these fields - Video title, description, publishing datetime, thumbnails URLs) in a database with proper indexes.
- ✅ A GET API which returns the stored video data in a paginated response sorted in descending order of published datetime.
  - endpoint: /api/video
  - sample query: http://localhost/api/video?p=2&s=3
- ✅ A basic search API to search the stored videos using their title and description.
  - endpoint: /api/video/search
  - sample query: http://localhost/api/video/search?s=music&p=2&s=3
- ✅ Dockerize the project.
- ✅ It should be scalable and optimised.

# Bonus Points:

- ✅ Add support for supplying multiple API keys so that if quota is exhausted on one, it automatically uses the next available key.
- 🚧 Make a dashboard to view the stored videos with filters and sorting options (optional)
- ✅ Optimise search api, so that it's able to search videos containing partial match for the search query in either video title or description.

# Instructions

- Clone the repo `git clone https://github.com/cryptus-neoxys/yt-api-task.git`
- Open directory in terminal `cd yt-api-task`
- copy .env file `cp .env.example .env`
- Add the API KEYS in .env file
- Run docker compose (.dev to explore with Kibana 🤷‍♂️) `docker-compose -f docker-compose.yml -f docker.compose.prod.yml`
- Project should be running via nginx on `PORT`:80 (default http port)
- Go to http://localhost/api

## API

- `GET`
  - endpoint: /api/video
  - response: `{data: []video, success: bool, pageNumber: int, pageSize: int, hasNext: bool, total: int}`
  - sample query: http://localhost/api/video?p=2&s=3
  - query params:

| param | for         | required | type |
| ----- | ----------- | -------- | ---- |
| p     | page number | true     | int  |
| s     | page size   | true     | int  |

- `SEARCH`
  - endpoint: /api/video/search
  - response: `{data: []video, success: bool, pageNumber: int, pageSize: int, hasNext: bool, total: int}`
  - sample query: http://localhost/api/video/search?s=music&p=2&s=3
  - query params:

| param | for         | required | type   |
| ----- | ----------- | -------- | ------ |
| p     | page number | true     | int    |
| s     | page size   | true     | int    |
| q     | search term | true     | string |

# Reference:

- YouTube data v3 API: [https://developers.google.com/youtube/v3/getting-started](https://developers.google.com/youtube/v3/getting-started)
- Search API reference: [https://developers.google.com/youtube/v3/docs/search/list](https://developers.google.com/youtube/v3/docs/search/list)
- ElasticSearch node.js client: [https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html)
