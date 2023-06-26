import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListProductComponent } from './features/product/pages/list-product/list-product.component';
import { SiteLayoutComponent } from "./layout/components/site-layout/site-layout.component";
import { OrderComponent } from "./features/cart/pages/order/order.component";
import { LoginComponent } from "./features/auth/pages/login/login.component";
import { RegisterComponent } from "./features/auth/pages/register/register.component";
import { ProductPageComponent } from './features/product/pages/product-page/product-page.component';
import { VerifyEmailComponent } from './features/auth/pages/verify-email/verify-email.component';

const routes: Routes = [{
  path:'',
  component: SiteLayoutComponent,
  children: [
    { path: '', component: ListProductComponent, pathMatch: 'full'},
    { path: 'product/:id', component: ProductPageComponent},
    { path: "order", component: OrderComponent }
  ],
},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'confirm/:confirmationCode', component: VerifyEmailComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
