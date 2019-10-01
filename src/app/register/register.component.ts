import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}
  newUserForm: FormGroup;
  ngOnInit() {
    this.createNewUserForm();
  }
  createNewUserForm() {
    this.newUserForm = this.formBuilder.group(
      {
        username: [
          "",
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(15)
          ]
        ],
        password: [
          "",
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(15)
          ]
        ],
        passwordC: [
          "",
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
    return g.get("password").value === g.get("passwordC").value
      ? null
      : { mismatch: true };
  }
}
