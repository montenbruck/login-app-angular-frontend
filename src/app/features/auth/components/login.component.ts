// src/app/features/auth/components/login/login.component.ts
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service'; // Importación correcta
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html', // Referencia al archivo HTML
  styleUrls: ['./login.component.scss'] // Referencia al archivo SCSS
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.errorMessage = null;
    this.isLoading = true;
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value).pipe(
        tap(() => {
          this.router.navigate(['/users']); // Navegar al dashboard o lista de usuarios
        }),
        catchError((err) => {
          this.errorMessage = err.message || 'Login failed. Please check your credentials.';
          return of(null); // Retorna un observable nulo para que la suscripción no falle
        })
      ).subscribe(() => {
        this.isLoading = false;
      });
    } else {
      this.isLoading = false;
      this.errorMessage = 'Por favor, completa todos los campos requeridos.';
    }
  }
}