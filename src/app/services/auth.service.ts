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
  userInfo: any = {};
  TOKEN_KEY = "token";
  logIn(loginUser: LoginUser) {
    this.http.post(this.path + "authenticate", loginUser).subscribe(data => {
      if (data["error"]) {
        this.userInfo = {};
        this.userInfo.error = data["error"].message;
      } else {
        this.userInfo = {};
        this.saveToken(data["token"]);
        this.userInfo.username = this.jwtHelper.decodeToken(
          data["token"]
        ).username;
      }
    });
  }
  saveToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
  logOut() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  loggedIn() {
    return tokenNotExpired(this.TOKEN_KEY);
  }

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
