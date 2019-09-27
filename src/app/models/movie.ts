import { Director } from "./director";
export class Movie {
  _id: string;
  title: string;
  category: string;
  country: string;
  year: number;
  imdb_score: number;
  cover: string;
  director: Director;
}
