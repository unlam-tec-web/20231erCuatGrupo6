// Modules
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";


// Services

// Components
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [
    LoginComponent
  ]
})
export class AuthModule {}
