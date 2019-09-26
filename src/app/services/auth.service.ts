import { LoginUser } from "./../models/loginUser";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { JwtHelper, tokenNotExpired } from "angular2-jwt";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}
  path = "https://movie-api-with-nodejs.herokuapp.com/";
  jwtHelper: JwtHelper = new JwtHelper();
  username: string = this.getCurrentUser();
  loading: boolean = false;
  TOKEN_KEY = "token";
  logIn(loginUser: LoginUser) {
    this.loading = true;
    this.http.post(this.path + "authenticate", loginUser).subscribe(data => {
      this.username = "";
      if (data["error"]) {
        //todo alert
        this.username = "";
      } else if (data["token"]) {
        this.saveToken(data["token"]);
        this.username = this.jwtHelper.decodeToken(data["token"]).username;
      }
      this.loading = false;
    });
  }
  saveToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
  logOut() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.username = "";
  }

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  getCurrentUser() {
    this.username = this.token
      ? this.jwtHelper.decodeToken(this.token).username
        ? this.jwtHelper.decodeToken(this.token).username
        : ""
      : "";
    return this.username;
  }
}
