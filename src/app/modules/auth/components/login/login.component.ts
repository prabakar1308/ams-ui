import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      userId: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { userId, password } = this.loginForm.value;
      this.authService.login(userId, password).subscribe({
        next: (res) => {
          console.log('Login successful!', res);
          // Navigate or store token
          this.router.navigate(['/master']);
        },
        error: (err) => {
          this.errorMessage = err.error.message || 'Login failed';
        },
      });
    }
  }
}
