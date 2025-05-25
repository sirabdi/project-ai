import { DataMovieWithEmbed, Movie } from "./types/type";
import { generateEmbedding, loadJSONData, saveDataToJSONFile } from "./utils";

async function generateData() {
  const data = loadJSONData<Movie[]>("../data/data.json");
  const embeddings = await generateEmbedding(data.map((d) => d.description));
  const dataWithEmbed: DataMovieWithEmbed[] = [];

  for (let i = 0; i < data.length; i++) {
    dataWithEmbed.push({
      input: data[i].name,
      description: data[i].description,
      embedding: embeddings?.data[i].embedding ?? [],
    });
  }

  saveDataToJSONFile(dataWithEmbed, "../data/result.json");
}

generateData();
