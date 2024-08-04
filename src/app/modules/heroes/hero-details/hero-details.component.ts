import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NgxGraphModule } from "@swimlane/ngx-graph";
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
  hero: any | null = null;
  nodes: any = [];
  links: any = [];

  constructor(
    private activeRoute: ActivatedRoute,
    private starWarsApi: StarWarsApiService,) {
  }

  ngOnInit(): void {
    let {hero} = this.activeRoute.snapshot.data;

    this.loadHeroDetails(hero);
  }

  loadHeroDetails(hero: any): void {
    this.starWarsApi.getHeroDetails(10).subscribe((data)=> {
      console.log(data)
    })

  }


}
