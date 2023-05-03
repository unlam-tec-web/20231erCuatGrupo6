// Modules
import { NgModule } from "@angular/core";
import { CommonModule, NgOptimizedImage } from "@angular/common";

// Services

// Components
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { RouterLink } from "@angular/router";

@NgModule({
	imports: [CommonModule, NgOptimizedImage, RouterLink],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SearchBarComponent
  ]
})
export class LayoutModule {
}
