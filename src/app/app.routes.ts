import { Routes } from '@angular/router';
import { heroesRoutes } from "@modules/heroes/heroes.routes";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@modules/heroes/heroes.component').then((c)=> c.HeroesComponent),
    children: heroesRoutes
  }
];
