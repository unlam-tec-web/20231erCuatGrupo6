// Modules
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// Services

// Components
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';


@NgModule({
  imports: [CommonModule],
  declarations: [
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthModule {
}
