// Modules
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// Services

// Components
import { OrderComponent } from './pages/order/order.component';
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "order", component: OrderComponent }
]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [
    OrderComponent
  ]
})
export class CartModule {
}
