import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  loginForm: FormGroup;
  recaptchaResponse: string | undefined;
  loginError: boolean = false;
  loginErrorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }

  //Tengo una respuesta 403 porque no está validado el usuario, necesito que para este caso haya un error en loginErrorMessage también
  onSubmit() {
    if (!this.loginForm.value.email || !this.loginForm.value.password) {
      this.loginErrorMessage = 'Por favor, complete todos los campos';
      return;
    }
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          console.log('Inicio de sesión exitoso', response);
          this.authService.saveToken(response.access_token);
          this.router.navigate(['/admin/dashboard']); // Ajusta la ruta según la configuración de tu enrutador
        },
        error: (error: any) => {
          if (error.status === 403) {
            this.loginErrorMessage = 'El usuario no está validado';
          }
          this.loginError = true;
        }
      });
    } else {
      this.loginErrorMessage = 'Por favor, completa todos los campos correctamente';
    }
  }

  resolved(captchaResponse: string | null) {
    this.recaptchaResponse = captchaResponse ?? '';
    this.loginForm.patchValue({ captcha: this.recaptchaResponse });
  }
}
