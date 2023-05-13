// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// Services

// Components
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

@NgModule({
  imports: [CommonModule,FormsModule,MaterialModule,ReactiveFormsModule],
  declarations: [LoginComponent, RegisterComponent],
})
export class AuthModule {}
