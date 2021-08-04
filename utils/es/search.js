const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://elasticsearch:9200" });

async function runSearch(searchQuery, pageNumber, pageSize) {
  // Let's search!
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
          // to include all fields
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
