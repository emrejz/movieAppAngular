import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Movie } from "../models/movie";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class MovieService {
  constructor(private http: HttpClient) {}
  path = "https://movie-api-with-nodejs.herokuapp.com/";
  movies: Movie[] = [];
  headers: HttpHeaders = new HttpHeaders();

  // getMovies(token?: string): Observable<Movie[]> {
  //   return this.http.get<Movie[]>(this.path + "api/movies", {
  //     headers: this.headers.append("x-access-token", token)
  //   });
  // }
  getMoviesFunc(token: string = localStorage.getItem("token")) {
    if (token) {
      this.http
        .get<Movie[]>(this.path + "api/movies", {
          headers: this.headers.append("x-access-token", token)
        })
        .subscribe(
          data => {
            this.movies = data;
            //todo error
          },
          error => {
            //todo error
          }
        );
    } else {
      //todo redirect
    }
  }
  addMovieFunc(movie: Movie) {
    const token = localStorage.getItem("token");
    if (token) {
      this.http
        .post(this.path + "api/movies", movie, {
          headers: this.headers.append("x-access-token", token)
        })
        .subscribe(
          data => {
            //todo redirect movie
            //tode if error ?
          },
          error => {
            //todo error
          }
        );
    } else {
      //todo redirect
    }
  }
}
