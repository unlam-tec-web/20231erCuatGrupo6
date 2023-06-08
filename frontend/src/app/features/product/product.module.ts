// Modules
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListProductComponent } from './pages/list-product/list-product.component';
import { MaterialModule } from '../../material/material.module';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { RouterLink } from "@angular/router";
import { PipeModule } from './pipe/pipe.module';

// Services

// Components


@NgModule({ 
    declarations:[ListProductComponent,ProductPageComponent],
    imports:[
        CommonModule,
        MaterialModule,
        PipeModule,
        RouterLink
    ], 
})
export class ProductModule {
}
