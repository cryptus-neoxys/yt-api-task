const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://elasticsearch:9200" });

async function runSearch(searchQuery, pageNumber, pageSize) {
  // Let's search!

  // handle case for invalid params
  pageNumber = parseInt(pageNumber);
  pageNumber = pageNumber || 0;

  pageSize = parseInt(pageSize);
  pageSize = pageSize || 10;

  // get full text search results using query `match`
  // from elasticsearch
  // Match query with title and desc fields
  // for each select best score from both fields
  // use from and size for offset based pagination

  const { body } = await client.search({
    index: "videos",
    from: pageSize * (pageNumber - 1),
    size: pageSize,
    sort: "publishedAt:desc",
    body: {
      query: {
        multi_match: {
          query: searchQuery,
          fields: ["title", "description"],
          type: "best_fields",
          // tie_breaker can optionally be enabled
          // to include both fields
          // tie_breaker: 0.2,
        },
      },
    },
  });

  return { hits: body.hits.hits, total: body.hits.total.value };
}

module.exports = {
  runSearch,
};
