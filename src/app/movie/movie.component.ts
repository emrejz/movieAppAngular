import { MovieService } from "./../services/movie.service";
import { Component, OnInit } from "@angular/core";
import { Movie } from "../models/movie";

@Component({
  selector: "app-movie",
  templateUrl: "./movie.component.html",
  styleUrls: ["./movie.component.css"]
})
export class MovieComponent implements OnInit {
  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieService.getMoviesFunc();
  }
  get movies() {
    return this.movieService.movies;
  }
}
