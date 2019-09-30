import { Director } from "./../models/director";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class DirectorService {
  constructor(private http: HttpClient, private router: Router) {}
  path = "https://movie-api-with-nodejs.herokuapp.com/";
  directors: Director[] = [];
  headers: HttpHeaders = new HttpHeaders();

  getDirectorsFunc(token: string = localStorage.getItem("token")) {
    if (token)
      this.http
        .get<Director[]>(this.path + "api/directors", {
          headers: this.headers.append("x-access-token", token)
        })
        .subscribe(
          data => {
            if (data["error"]) {
              //todo error
            } else {
              this.directors = data;
            }
          },
          error => {
            console.log(error);
            //todo error
          }
        );
    else this.router.navigateByUrl("register");
  }
}
