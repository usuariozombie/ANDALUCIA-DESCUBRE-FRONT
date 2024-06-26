import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { TownService } from '../core/town.service';

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
    registerForm: FormGroup;
    recaptchaResponse: string | undefined;
    showConfirmation: boolean = false;
    communities: string[] = ["Almería", "Cádiz", "Córdoba", "Granada", "Huelva", "Jaén", "Málaga", "Sevilla"]; // Ejemplo de comunidades

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private townService: TownService) {
        this.registerForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
            terms: [false, Validators.requiredTrue],
            captcha: ['', Validators.required],
            townName: ['', Validators.required],
            townProvince: ['', Validators.required]
        });

        this.registerForm.valueChanges.subscribe(() => {
            this.validateForm();
        });
    }

    validateForm() {
        for (const field in this.registerForm.controls) {
            const control = this.registerForm.get(field);
            if (control) {
                control.markAsTouched();
            }
        }
    }

    isFieldValid(field: string) {
        const control = this.registerForm.get(field);
        return control?.touched && control?.invalid;
    }

    getErrorMessage(field: string) {
        const control = this.registerForm.get(field);
        if (control?.errors?.['required']) {
            return 'Este campo es obligatorio';
        } else if (control?.errors?.['email']) {
            return 'Por favor, introduce un correo electrónico válido';
        } else if (control?.errors?.['passwordMismatch']) {
            return 'Las contraseñas no coinciden';
        }
        return '';
    }

    onSubmit() {
        this.registerForm.markAllAsTouched();
        if (this.registerForm.valid) {
            const townData = {
                townName: this.registerForm.value.townName,
                townImage: '',
                townVisibility: 0,
                townProvince: this.registerForm.value.townProvince
            };

            console.log('Creando pueblo', townData);

            this.townService.createTown(townData).then(
                (townResponse: any) => {
                    console.log('Pueblo creado exitosamente', townResponse);
                    const userData = {
                        ...this.registerForm.value,
                        townID: townResponse.townId
                    };

                    this.authService.register(userData).subscribe(
                        (response: any) => {
                            console.log('Registro exitoso', response);
                            this.showConfirmation = true;
                            setTimeout(() => {
                                this.router.navigate(['/']);
                            }, 5000);
                        },
                        (error: any) => {
                            console.log('Error en el registro', error);
                            // Eliminar el pueblo si el registro del usuario falla
                            this.townService.deleteTown(townResponse.townId).then(
                                () => {
                                    console.log('Pueblo eliminado debido a error en el registro del usuario');
                                },
                                (deleteError: any) => {
                                    console.log('Error al eliminar el pueblo', deleteError);
                                }
                            );
                        }
                    );
                },
                (error: any) => {
                    console.log('Error al crear el pueblo', error);
                }
            );
        } else {
            const requiredFields = ['name', 'email', 'password', 'confirmPassword', 'terms', 'townName', 'townProvince'];
            const missingFields = requiredFields.filter(field => !this.registerForm.get(field)?.value);

            if (missingFields.length > 0) {
                console.log('Por favor, complete todos los campos');
                return;
            }
        }
    }

    resolved(captchaResponse: string | null) {
        this.recaptchaResponse = captchaResponse ?? '';
        this.registerForm.patchValue({ captcha: this.recaptchaResponse });
    }
}
