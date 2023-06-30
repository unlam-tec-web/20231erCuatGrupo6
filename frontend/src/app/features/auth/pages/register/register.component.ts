import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm!: FormGroup;
  error!: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      surname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
          ),
        ],
      ],
      address: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]+$/)]],
    });
  }

  registrar(): void {
    if (this.registerForm.invalid) return;
    
    this.loginService
      .register(this.registerForm.value)
      .then((user) => {
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error(error);
        this.error = error.error.message; // Asignar el mensaje de error a la propiedad
      });
  }

  hideError(): void {
    this.error = ''; // Restablecer el valor del error
  }

  login(): void {
    this.router.navigate(['/login']);
  }
}
