import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoadingService } from "@core/services/loading.service";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: 'app-preloader',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './preloader.component.html',
  styleUrl: './preloader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreloaderComponent {
  $loading = this.loadingService.loading$

  constructor(private loadingService: LoadingService) {
  }
}
