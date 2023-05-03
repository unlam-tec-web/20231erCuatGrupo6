// Modules
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListProductComponent } from './pages/list-product/list-product.component';
import { MaterialModule } from '../../material/material.module';
import { ProductImagePipe } from './pipe/product-image.pipe';

// Services

// Components


@NgModule({ 
    declarations:[ListProductComponent, ProductImagePipe],
    imports:[
        CommonModule,
        MaterialModule
    ], 
})
export class ProductModule {
}
