import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) {}
  confirmationCode!: string;

  ngOnInit() {
    //obtener el codigo de confirmacion de la url
    console.log(this.route.snapshot.params);
    this.confirmationCode = this.route.snapshot.params['confirmationCode'];
    console.log(this.confirmationCode);
    //llamar al servicio para verificar el codigo
    this.loginService.verifyUser(this.confirmationCode).then(() => {
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 5000);
    });
  }
}
