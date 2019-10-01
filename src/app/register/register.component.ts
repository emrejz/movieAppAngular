import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}
  newUserForm: FormGroup;
  ngOnInit() {
    this.createNewUserForm();
  }
  createNewUserForm() {
    this.newUserForm = this.formBuilder.group(
      {
        username: [
          { value: "", disabled: this.signUpProgress },
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(15)
          ]
        ],
        password: [
          { value: "", disabled: this.signUpProgress },
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(15)
          ]
        ],
        passwordC: [
          { value: "", disabled: this.signUpProgress },
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(15)
          ]
        ]
      },
      {
        validator: this.passwordMatchValidator
      }
    );
  }
  passwordMatchValidator(g: FormGroup) {
    g.get("password").value !== g.get("passwordC").value &&
      g.get("passwordC").setErrors({ mismatch: true });
  }
  newUser() {
    if (this.newUserForm.valid) {
      this.authService.signUp(this.newUserForm.value);
    }
  }
  get signUpProgress() {
    return this.authService.loading;
  }
}
