import { ChromaClient } from "chromadb";

const client = new ChromaClient({
  path: "http://localhost:8000",
});

async function createCollection() {
  const response = await client.createCollection({
    name: "data-test",
  });

  console.log("Created collection:", response);
}

async function addDataOnCollection() {
  const collections = await client.getCollection({
    name: "data-test",
  });
  const result = await collections.add({
    ids: ["id1"],
    documents: ["Here is my entry"],
    embeddings: [[0.1, 0.2]],
  });
  console.log("result ", result);
}

async function listCollections() {
  const collections = await client.listCollections();
  console.log(collections);
}

// createCollection();
addDataOnCollection();
// listCollections();
