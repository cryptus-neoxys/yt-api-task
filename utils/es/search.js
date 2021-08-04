const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://elasticsearch:9200" });

async function run(searchQuery, pageSize, pageNumber) {
  // Let's search!
  const { body } = await client.search({
    index: "videos",
    from: pageSize * (pageNumber - 1),
    size: pageSize,
    sort: [{ publishedAt: "desc" }],
    body: {
      query: {
        match: {
          title: searchQuery,
          description: searchQuery,
        },
      },
    },
  });

  console.log(body.hits.hits);
  return body.hits.hits;
}
