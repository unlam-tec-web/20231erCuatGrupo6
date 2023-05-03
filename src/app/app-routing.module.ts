import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListProductComponent } from './features/product/pages/list-product/list-product.component';
import { SiteLayoutComponent } from "./layout/components/site-layout/site-layout.component";
import { OrderComponent } from "./features/cart/pages/order/order.component";
import { LoginComponent } from "./features/auth/pages/login/login.component";
import { RegisterComponent } from "./features/auth/pages/register/register.component";

const routes: Routes = [{
  path:'',
  component: SiteLayoutComponent,
  children: [
    { path: '', component: ListProductComponent, pathMatch: 'full'},
    { path: "order", component: OrderComponent }
  ],
},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
