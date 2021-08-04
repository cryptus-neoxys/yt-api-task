const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://elasticsearch:9200" });

async function runGet(pageNumber, pageSize) {
  // Let's search!
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

  return { hits: body.hits.hits, total: body.hits.total.value };
}

module.exports = {
  runGet,
};
