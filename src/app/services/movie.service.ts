import { AlertifyService } from "./alertify.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Movie } from "../models/movie";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class MovieService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private alertifyService: AlertifyService
  ) {}
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
            if (data["error"]) {
              this.router.navigateByUrl("register");
            } else this.movies = data;
          },
          error => {
            this.alertifyService.error("Service error");
          }
        );
    } else {
      this.alertifyService.warning("Please sign in/up");
      this.router.navigateByUrl("register");
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
            if (data["error"]) {
              this.alertifyService.warning(data["error"].message);
            } else {
              this.alertifyService.success("Movie added");

              this.router.navigateByUrl("movies");
            }
          },
          error => {
            this.alertifyService.error("Serice error");
          }
        );
    } else {
      this.alertifyService.warning("Please sign in/up");
      this.router.navigateByUrl("register");
    }
  }
}
