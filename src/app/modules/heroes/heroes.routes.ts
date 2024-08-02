import { Routes } from "@angular/router";
import { HeroesComponent } from "@modules/heroes/heroes.component";
import { HeroesListComponent } from "@modules/heroes/heroes-list/heroes-list.component";
import { HeroDetailsComponent } from "@modules/heroes/hero-details/hero-details.component";
import { heroDetailsResolver } from "@shared/resolvers/hero-details.resolver";

export const heroesRoutes: Routes = [
  {
    path: '',
    component: HeroesListComponent,
  },
  {
    path: ':id',
    component: HeroDetailsComponent,
    // resolve: { hero: heroDetailsResolver }
  }
];
