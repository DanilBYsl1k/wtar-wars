import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { MainComponent } from "../main/main.component";
import { RouterOutlet } from "@angular/router";
import { PreloaderComponent } from "@shared/components/preloader/preloader.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    MainComponent,
    RouterOutlet,
    PreloaderComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
