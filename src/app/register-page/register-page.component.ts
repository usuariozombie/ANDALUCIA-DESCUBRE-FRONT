import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  registerForm: FormGroup;
  recaptchaResponse: string | undefined;
  showConfirmation: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue],
      captcha: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        (response: any) => {
          console.log('Registro exitoso', response);
          this.showConfirmation = true;
          setTimeout(() => {
            this.router.navigate(['/']); // Ajusta la ruta según la configuración de tu enrutador
          }, 5000); // Redirige a la página de inicio después de 5 segundos
        },
        (error: any) => {
          console.log('Error en el registro', error);
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }

  resolved(captchaResponse: string | null) {
    this.recaptchaResponse = captchaResponse ?? '';
    this.registerForm.patchValue({ captcha: this.recaptchaResponse });
  }
}
