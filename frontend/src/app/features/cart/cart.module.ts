// Modules
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// Services

// Components
import { HttpClientModule } from "@angular/common/http";
import { MaterialModule } from '../../material/material.module';
import { OrderComponent } from './pages/order/order.component';
import { RouterModule } from '@angular/router';
import { PipeModule } from '../product/pipe/pipe.module';

@NgModule({
  declarations: [OrderComponent ],
  imports: [CommonModule, HttpClientModule,MaterialModule,PipeModule,RouterModule],
})
export class CartModule {
}
