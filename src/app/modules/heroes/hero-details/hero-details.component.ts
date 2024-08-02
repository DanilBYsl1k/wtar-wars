import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { IHeroInterface } from "@shared/interface/hero.interface";
import { Edge, NgxGraphModule } from "@swimlane/ngx-graph";
import { StarWarsApiService } from "@shared/services/star-wars-api.service";

@Component({
  selector: 'app-hero-details',
  standalone: true,
  imports: [
    NgxGraphModule
  ],
  templateUrl: './hero-details.component.html',
  styleUrl: './hero-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroDetailsComponent implements OnInit {
  // hero = signal<IHeroInterface | null>(null);


  constructor(
    private activeRoute: ActivatedRoute,
    private starWarsApi: StarWarsApiService,) {
  }

  ngOnInit(): void {
    let { hero } = this.activeRoute.snapshot.data;

    // this.hero = signal<IHeroInterface>(hero);

    this.starWarsApi.getHeroDetails(1).subscribe()
  }

}
