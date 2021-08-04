const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://elasticsearch:9200" });

async function runGet(pageNumber, pageSize) {
  // get videos!

  // handle case for invalid params
  pageNumber = parseInt(pageNumber);
  pageNumber = pageNumber || 0;

  pageSize = parseInt(pageSize);
  pageSize = pageSize || 10;

  // get all videos from elasticsearch using match_all
  // use from and size for offset based pagination

  const { body } = await client.search({
    index: "videos",
    from: pageSize * (pageNumber - 1),
    size: pageSize,
    sort: "publishedAt:desc",
    body: {
      query: {
        match_all: {},
      },
    },
  });

  // return data and total matches in database
  return { hits: body.hits.hits, total: body.hits.total.value };
}

module.exports = {
  runGet,
};
