import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthFacadeService } from '@modules/auth/services/auth-facade.service';
import { APP_DEFAULT_ROUTE } from 'app/app.constants';
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authfacade: AuthFacadeService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      userId: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.authfacade.userSubject.subscribe((userData) => {
      if (userData) {
        this.router.navigate([APP_DEFAULT_ROUTE]);
      }
    });

    // automatically login if user is already logged in
    const userData = localStorage.getItem('userData');
    if (userData) {
      this.authfacade.userLoginSucess(JSON.parse(userData));
      this.authfacade.userSubject.next(JSON.parse(userData));
      this.router.navigate([APP_DEFAULT_ROUTE]);
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { userId, password } = this.loginForm.value;
      this.authfacade.userLogin(userId, password);
    }
  }
}
