import { Router } from "@angular/router";
import { MovieService } from "./movie.service";
import { LoginUser } from "./../models/loginUser";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { JwtHelper, tokenNotExpired } from "angular2-jwt";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private movieService: MovieService,
    private router: Router
  ) {}
  path = "https://movie-api-with-nodejs.herokuapp.com/";
  jwtHelper: JwtHelper = new JwtHelper();
  username: string = "";
  loading: boolean = false;
  TOKEN_KEY = "token";
  logIn = (loginUser: LoginUser) => {
    this.loading = true;
    this.http.post(this.path + "authenticate", loginUser).subscribe(
      data => {
        this.username = "";
        if (data["error"]) {
          //todo alert
          this.username = "";
        } else if (data["token"]) {
          this.movieService.getMoviesFunc(data["token"]);
          this.saveToken(data["token"]);
          this.username = this.jwtHelper.decodeToken(data["token"]).username;
        }
        this.loading = false;
      },
      error => {
        this.loading = false;
        //todo alert
      }
    );
  };
  // logInn(loginUser: LoginUser): Observable<Token> {
  //   return this.http.post<Token>(this.path + "authenticate", loginUser);
  // }
  signUp(loginUser: LoginUser) {
    this.loading = true;
    this.http.post(this.path + "register", loginUser).subscribe(
      data => {
        console.log(data);
        this.username = "";
        this.loading = false;
        if (data["error"]) {
          //todo alert
        } else if (data["token"]) {
          this.saveToken(data["token"]);
          this.username = this.jwtHelper.decodeToken(data["token"]).username;
          this.router.navigateByUrl("movies");
        }
      },
      error => {
        this.loading = false;
        console.log(error);
        //todo error
      }
    );
  }
  saveToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
  logOut() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.username = "";
  }
  loggedIn(): boolean {
    if (this.token) {
      if (this.jwtHelper.isTokenExpired(this.token)) {
        this.logOut();
        return false;
      } else return true;
    } else return false;
  }
  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  getCurrentUser() {
    if (this.loggedIn()) {
      this.username = this.jwtHelper.decodeToken(this.token).username;
    } else {
      this.username = "";
    }
    return this.username;
  }
}
