import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { ForgotpassService } from 'src/app/core/services/forgotpass.service';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss'],
})
export class ForgotpasswordComponent {
  isLoading: boolean = false;
  errMsg: string = '';
  step1: boolean = true;
  step2: boolean = false;
  step3: boolean = false;
  email: string = '';
  userMsg: string = '';

  constructor(
    private _formBuilder: FormBuilder,
    private _forgotpassService: ForgotpassService,
    private _router: Router
  ) {}

  emailForm: FormGroup = this._formBuilder.group({
    email: ['', Validators.required],
  });

  resetCodeForm: FormGroup = this._formBuilder.group({
    resetCode: ['', Validators.required],
  });

  resetPasswordForm: FormGroup = this._formBuilder.group({
    email: this.emailForm.get('email')?.value, //msh hayla2y el email w hayerga3 be undefined 3ashan hakon 5afet section el email
    newPassword: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]],
  });

  handleForgotPassword(): void {
    let userEmail = this.emailForm.value;
    this.email = userEmail.email;
    this._forgotpassService.forgetPassword(userEmail).subscribe({
      next: (res) => {
        this.userMsg = res.message;
        this.step1 = false;
        this.step2 = true;
      },
      error: (err) => {
        console.log(err);
        this.userMsg = err.error.message;
      },
    });
  }

  resetCode(): void {
    let resetCode = this.resetCodeForm.value;
    this._forgotpassService.verifyResetCode(resetCode).subscribe({
      next: (res) => {
        this.userMsg = res.status;
        this.step2 = false;
        this.step3 = true;
      },
      error: (err) => {
        console.log(err);
        this.userMsg = err.error.message;
      },
    });
  }

  resetPassword(): void {
    let resetForm = this.resetPasswordForm.value;
    resetForm.email = this.email;
    this._forgotpassService.resetPassword(resetForm).subscribe({
      next: (res) => {
        if (res.token) {
          localStorage.setItem('userToken', res.token);
          this._router.navigate(['/home']);
        }
      },
      error: (err) => {
        console.log(err);
        this.userMsg = err.error.message;
      },
    });
  }
}
