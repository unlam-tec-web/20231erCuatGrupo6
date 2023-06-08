import { NgModule } from '@angular/core';
import { ProductImagePipe } from './product-image.pipe';



@NgModule({
  declarations:[ProductImagePipe],
  exports:[
    ProductImagePipe
  ]
})
export class PipeModule { }
