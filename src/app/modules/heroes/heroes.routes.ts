import { Routes } from "@angular/router";

import { HeroesListComponent } from "@modules/heroes/heroes-list/heroes-list.component";
import { HeroDetailsComponent } from "@modules/heroes/hero-details/hero-details.component";
import { heroDetailsResolver } from "@shared/resolvers/hero-details.resolver";

export const heroesRoutes: Routes = [
  {
    path: '',
    redirectTo: 'heroes',
    pathMatch: 'full'
  },
  {
    path: 'heroes',
    component: HeroesListComponent,
  },
  {
    path: 'hero/:id',
    component: HeroDetailsComponent,
    resolve: { hero: heroDetailsResolver }
  }
];
