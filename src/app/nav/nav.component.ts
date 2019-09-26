import { AuthService } from "./../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  constructor(private authService: AuthService) {}
  loginUser: any = {};
  loginForm: FormGroup;
  ngOnInit() {}
  logIn() {
    this.authService.logIn(this.loginUser);
  }
  logOut() {
    this.authService.logOut();
  }
}
