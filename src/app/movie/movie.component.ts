import { Component, OnInit } from "@angular/core";
import { Movie } from "../models/movie";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-movie",
  templateUrl: "./movie.component.html",
  styleUrls: ["./movie.component.css"]
})
export class MovieComponent implements OnInit {
  constructor(private http: HttpClient) {}
  movies: Movie[] = [];
  ngOnInit() {}
}
