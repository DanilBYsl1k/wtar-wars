import { Routes } from "@angular/router";

import { HeroesListComponent } from "@modules/heroes/heroes-list/heroes-list.component";
import { HeroDetailsComponent } from "@modules/heroes/hero-details/hero-details.component";


export const heroesRoutes: Routes = [
  {
    path: '',
    redirectTo: 'hero',
    pathMatch: 'full'
  },
  {
    path: 'hero',
    component: HeroesListComponent,
  },
  {
    path: 'hero/:id',
    component: HeroDetailsComponent,
    // resolve: { hero: heroDetailsResolver }
  }
];
