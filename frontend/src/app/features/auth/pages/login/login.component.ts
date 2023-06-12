import { Component , Input , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error!: string;

  constructor(private formBuilder: FormBuilder,private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
      ]]
    });
  }

  get password() {
    return this.loginForm.get('password');
  }

  login(): void {
    if(this.loginForm.invalid) return;
    this.loginService.login(this.loginForm.value)
      .then(() => this.router.navigate(['/']))
      .catch((error) => {
        console.error(error);
        this.error = 'Usuario no encontrado'; // Asignar el mensaje de error a la propiedad
      });
  }

  hideError(): void {
    this.error = ''; // Restablecer el valor del error
  }

  register(): void {
    this.router.navigate(['/register']);
  }

}
