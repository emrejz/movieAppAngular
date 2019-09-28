import { DirectorService } from "./../../services/director.service";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Movie } from "src/app/models/movie";

@Component({
  selector: "app-movie-add",
  templateUrl: "./movie-add.component.html",
  styleUrls: ["./movie-add.component.css"]
})
export class MovieAddComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private directorService: DirectorService
  ) {}
  movieAddForm: FormGroup;
  movie: Movie;
  ngOnInit() {
    this.createMovieAdd();
    this.directorService.getDirectorsFunc();
  }
  createMovieAdd() {
    this.movieAddForm = this.formBuilder.group({
      title: [
        "",
        [Validators.required, Validators.minLength(1), Validators.maxLength(30)]
      ],
      year: [
        "",
        [
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.min(1800),
          Validators.max(2020)
        ]
      ],
      imdb_score: [
        "",
        [
          Validators.required,
          Validators.min(0),
          Validators.max(10),
          Validators.pattern("^-?[0-9]\\d*(\\.\\d{1})?$")
        ]
      ],
      cover: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
          )
        ]
      ],
      director: [""]
    });
  }
  get directors() {
    return this.directorService.directors;
  }
  addMovie() {
    console.log(this.movieAddForm.value);
  }
}
