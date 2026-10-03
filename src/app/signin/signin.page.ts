import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-signin",
  standalone: true,
  imports: [
    IonicModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./signin.page.html",
  styleUrls: ["./signin.page.scss"]
})
export class SigninComponent implements OnInit {
  signInForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.signInForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  onSubmit(): void {
    if (this.signInForm.valid) {
      this.authService.login(this.signInForm.value.email, this.signInForm.value.password)
        .subscribe(() => {
          console.log("Login successful");
        }, error => {
          console.error("Login failed:", error);
        });
    }
  }
}