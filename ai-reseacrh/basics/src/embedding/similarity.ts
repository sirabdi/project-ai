import { DataMovieWithEmbed } from "./types/type";
import { generateEmbedding, loadJSONData } from "./utils";

function doProduct(a: number[], b: number[]) {
  return a.map((value, index) => value * b[index]).reduce((a, b) => a + b, 0);
}

function cosineSimiliarity(a: number[], b: number[]) {
  const product = doProduct(a, b);
  const aMagnitude = Math.sqrt(
    a.map((value) => value * value).reduce((a, b) => a + b, 0)
  );
  const bMagnitude = Math.sqrt(
    b.map((value) => value * value).reduce((a, b) => a + b, 0)
  );
  return product / (aMagnitude * bMagnitude);
}

async function main() {
  const dataWithEmbed = loadJSONData<DataMovieWithEmbed[]>(
    "../data/result.json"
  );

  const input = "Gangster";

  const inputEmbedding = await generateEmbedding(input);

  const similiarityValue: {
    input: string;
    description: string;
    similiarity: number;
  }[] = [];

  for (const entry of dataWithEmbed) {
    const similiarity = cosineSimiliarity(
      entry.embedding,
      inputEmbedding?.data[0].embedding ?? []
    );
    similiarityValue.push({
      input: entry.input,
      description: entry.description,
      similiarity,
    });
  }

  const sortSimiliarity = similiarityValue.sort(
    (a, b) => b.similiarity - a.similiarity
  );
  console.log(`Similiarity of ${input} with:`);
  sortSimiliarity.forEach((item) => {
    console.log(`${item.input}: ${item.similiarity}`);
    console.log(`Role: ${item.description}`);
    console.log("");
  });
}

main();
