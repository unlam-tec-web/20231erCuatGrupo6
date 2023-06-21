// Modules
import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from "@angular/common";

// Services

// Components
import { OrderComponent } from './pages/order/order.component';


@NgModule({
  declarations: [OrderComponent],
  imports: [CommonModule, HttpClientModule, MaterialModule, RouterModule]
})
export class CartModule {
}
