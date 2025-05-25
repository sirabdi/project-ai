import { readFileSync, writeFileSync } from "fs";
import { OpenAI } from "openai";
import { join } from "path";

const openai = new OpenAI();

export async function generateEmbedding(input: string | string[]) {
  if (!input) {
    console.log("Please fill the input field!");
    return;
  }

  const response = await openai.embeddings.create({
    input: input,
    model: "text-embedding-3-small",
  });

  return response;
}

export function loadJSONData<T>(filename: string): T {
  const path = join(__dirname, filename);
  const rawData = readFileSync(path);
  return JSON.parse(rawData.toString());
}

export function saveDataToJSONFile(data: any, filename: string) {
  const dataString = JSON.stringify(data);
  const dataBuffer = Buffer.from(dataString);
  const path = join(__dirname, filename);
  writeFileSync(path, dataBuffer);
  console.log(`saved data to ${filename}`);
}
