import { ResolveFn } from '@angular/router';
import { inject } from "@angular/core";
import { StarWarsApiService } from "@shared/services/star-wars-api.service";
import { FullInfoHero } from "@shared/interface/hero.interface";
import { Observable } from "rxjs";

export const heroDetailsResolver: ResolveFn<Observable<FullInfoHero>> = (route) => {
  const starWarsApi = inject(StarWarsApiService)
  const heroId = route.params['id'];
  return starWarsApi.getHeroDetails(heroId);
};
