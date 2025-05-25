export type DataWithEmbed = {
  input: string;
  embedding: number[];
};

export type DataMovieWithEmbed = {
  input: string;
  description: string;
  embedding: number[];
};

export type Movie = {
  name: string;
  description: string;
};
