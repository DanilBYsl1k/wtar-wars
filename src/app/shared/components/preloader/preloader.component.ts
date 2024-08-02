import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-preloader',
  standalone: true,
  imports: [],
  templateUrl: './preloader.component.html',
  styleUrl: './preloader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreloaderComponent {

}
