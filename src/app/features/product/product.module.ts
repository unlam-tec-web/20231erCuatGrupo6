// Modules
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListProductComponent } from './pages/list-product/list-product.component';
import { MaterialModule } from '../../material/material.module';
import { ProductImagePipe } from './pipe/product-image.pipe';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { RouterLink } from "@angular/router";

// Services

// Components


@NgModule({ 
    declarations:[ListProductComponent, ProductImagePipe, ProductPageComponent],
    imports:[
        CommonModule,
        MaterialModule,
        RouterLink
    ], 
})
export class ProductModule {
}
