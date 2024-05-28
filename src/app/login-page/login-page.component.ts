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

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          console.log('Inicio de sesión exitoso', response);
          this.authService.saveToken(response.access_token);
          this.router.navigate(['/admin/dashboard']); // Ajusta la ruta según la configuración de tu enrutador
        },
        error: (error: any) => {
          console.log('Error en el inicio de sesión', error);
          this.loginError = true;
        }
      });
    } else {
      console.log('Formulario inválido');
    }
  }

  resolved(captchaResponse: string | null) {
    this.recaptchaResponse = captchaResponse ?? '';
    this.loginForm.patchValue({ captcha: this.recaptchaResponse });
  }
}
