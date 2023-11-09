import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  Validators,
  FormControlOptions,
  FormBuilder,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  errMsg: string = '';
  isNotValidForm: boolean = true;
  isLoading: boolean = false;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _formBuilder: FormBuilder
  ) {}

  //USING FORM-BUILDER

  registerForm: FormGroup = this._formBuilder.group(
    {
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]],
      rePassword: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
    },
    {
      validators: [this.confirmPassword],
    } as FormControlOptions
  );

  // registerForm: FormGroup = new FormGroup(
  //   {
  //     name: new FormControl('', [
  //       Validators.required,
  //       Validators.minLength(3),
  //       Validators.maxLength(20),
  //     ]),
  //     email: new FormControl('', [Validators.required, Validators.email]),
  //     password: new FormControl('', [
  //       Validators.required,
  //       Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/),
  //     ]),
  //     rePassword: new FormControl('', [Validators.required]),
  //     phone: new FormControl('', [
  //       Validators.required,
  //       Validators.pattern(/^01[0125][0-9]{8}$/),
  //     ]),
  //   },
  //   { validators: [this.confirmPassword] } as FormControlOptions
  // );

  confirmPassword(form: FormGroup): void {
    const password = form.get('password');
    const rePassword = form.get('rePassword');

    if (password?.value !== rePassword?.value) {
      rePassword?.setErrors({
        mismatch: true,
      });
    }
  }

  handleRegister(): void {
    const userData = this.registerForm.value;
    if (this.registerForm.valid === true) {
      this.isLoading = true;
      this._authService.register(userData).subscribe({
        next: (res) => {
          if (res.message == 'success') {
            this.isLoading = false;
            this._router.navigate(['/login']);
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.errMsg = err.error.message;
        },
      });
    }
  }
}
