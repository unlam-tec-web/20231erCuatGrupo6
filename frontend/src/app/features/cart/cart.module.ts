// Modules
import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms'; 

// Services

// Components
import { OrderComponent } from './pages/order/order.component';


@NgModule({
  declarations: [OrderComponent],
  imports: [CommonModule, HttpClientModule, MaterialModule, RouterModule,FormsModule]
})
export class CartModule {
}
