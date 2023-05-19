// Modules
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// Services

// Components
import { OrderComponent } from './pages/order/order.component';
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [
    OrderComponent
  ]
})
export class CartModule {
}
