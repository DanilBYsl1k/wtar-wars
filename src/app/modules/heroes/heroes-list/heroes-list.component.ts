import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { AsyncPipe, JsonPipe } from "@angular/common";
import { MatPaginator } from "@angular/material/paginator";
import { ActivatedRoute, Router } from "@angular/router";

import { StarWarsApiService } from "@shared/services/star-wars-api.service";
import { PreloaderComponent } from "@shared/components/preloader/preloader.component";
import { HeroCardComponent } from "@shared/components/hero-card/hero-card.component";
import { Observable, tap } from "rxjs";
import { IResponseHero } from "@shared/interface/hero.interface";
import { MatButton } from "@angular/material/button";

@Component({
  selector: 'app-heroes-list',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    MatPaginator,
    PreloaderComponent,
    HeroCardComponent,
  ],
  templateUrl: './heroes-list.component.html',
  styleUrl: './heroes-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroesListComponent implements OnInit {
  $heroes: Observable<IResponseHero>;
  page = signal(1)

  constructor(
    private apiService: StarWarsApiService,
    private router: Router,
    private activeRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    let routPage = this.activeRoute.snapshot.queryParams['page'];
    this.page.set(routPage)
    this.$heroes = this.apiService.getHeroes(this.page()).pipe(
      tap(({ page }) => {
        this.page.set(page)
      }));
  }

  public nextHeroes(): void {
    this.page.update((value) => ++value)
    this.updatePageUrl();
  }

  public prevHeroes(): void {
    this.page.update((value) => --value);
    this.updatePageUrl();
  }

  private updatePageUrl(): void {
    this.router.navigate([ '' ], { queryParams: { page: this.page() } });
    this.$heroes = this.apiService.getHeroes(this.page());
  }
}
