// Modules
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MaterialModule } from '../../material/material.module';
import { RouterLink } from "@angular/router";

// Services

// Components
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { ListProductComponent } from './pages/list-product/list-product.component';
@NgModule({
    declarations:[ListProductComponent,ProductPageComponent],
    imports:[
        CommonModule,
        MaterialModule,
        RouterLink
    ],
})
export class ProductModule {
}
