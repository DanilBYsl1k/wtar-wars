import { ResolveFn } from '@angular/router';
import { inject } from "@angular/core";
import { StarWarsApiService } from "@shared/services/star-wars-api.service";

export const heroDetailsResolver: ResolveFn<any> = (route) => {
  const starWarsApi = inject(StarWarsApiService)
  const heroId = route.params['id'];
  return starWarsApi.getHeroDetails(heroId);
};
