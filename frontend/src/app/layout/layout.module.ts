// Modules
import { NgModule } from "@angular/core";
import { CommonModule, NgOptimizedImage } from "@angular/common";

// Services

// Components
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { RouterLink, RouterOutlet } from "@angular/router";
import { SiteLayoutComponent } from './components/site-layout/site-layout.component';

@NgModule({
  imports: [CommonModule, NgOptimizedImage, RouterLink, RouterOutlet],
  exports: [
    HeaderComponent,
    FooterComponent,
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SearchBarComponent,
    SiteLayoutComponent,
  ]
})
export class LayoutModule {
}
