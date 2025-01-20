import { FullInfoHero, IHeroInterface, IResponseHero } from "@shared/interface/hero.interface";
import { IFilmsInterface } from "@shared/interface/films.interface";
import { IStarship } from "@shared/interface/starships.interface";

export const mockHero: IHeroInterface = {
  id: 1,
  name: 'Luke Skywalker',
  birth_year: '19BBY',
  created: '2021-04-14T12:45:00Z',
  edited: '2021-04-14T12:45:00Z',
  eye_color: 'blue',
  gender: 'male',
  hair_color: 'blonde',
  height: '172',
  homeworld: 1,
  mass: '77',
  skin_color: 'fair',
  species: [1],
  starships: [1],
  films: [1],
  url: 'http://example.com',
};

export const mockFilm: IFilmsInterface = {
  id: 1,
  starships: [1],
  created: '2021-04-14T12:45:00Z',
  edited: '2021-04-14T12:45:00Z',
  producer: 'Rick McCallum',
  vehicles: [1],
  url: 'http://example.com',
  characters: [1],
  director: 'George Lucas',
  title: "The Phantom Menace",
  planets: [1],
  episode_id: 1,
  species: [1],
  opening_crawl: 'lorem',
  release_date: '2021-04-14T12:45:00Z',
};

export const mockStarship: IStarship = {
  MGLT: 'string',
  cargo_capacity: 'string',
  consumables: 'string',
  cost_in_credits: 'string',
  created: 'string',
  crew: 'string',
  edited: 'string',
  films: [1],
  hyperdrive_rating: 'string',
  id: 1,
  length: 'string',
  manufacturer: 'string',
  max_atmosphering_speed: 'string',
  model: 'string',
  name: 'string',
  passengers: 'string',
  pilots: [1],
  starship_class: 'string',
  url: 'string',
};

export const mockResponse: IResponseHero = {
  count: 1,
  next: "",
  previous: "",
  results: [mockHero],
  page: 1
};

export const mockFullHero: FullInfoHero = {
  id: 1,
  name: 'Luke Skywalker',
  birth_year: '19BBY',
  created: '2021-04-14T12:45:00Z',
  edited: '2021-04-14T12:45:00Z',
  eye_color: 'blue',
  gender: 'male',
  hair_color: 'blonde',
  height: '172',
  homeworld: 1,
  mass: '77',
  skin_color: 'fair',
  species: [1],
  starships: [mockStarship],
  films: [mockFilm],
  url: 'http://example.com',
  filmsShips: [{shipId:1, films: [1]}]
};

import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

function mockActivatedRouteSnapshot(params: { [key: string]: any }): ActivatedRouteSnapshot {
  return {
    params,
    url: [],
    queryParams: {},
    fragment: '',
    data: {},
    outlet: 'primary',
    component: null,
    routeConfig: null,
    root: {} as any,
    parent: null,
    firstChild: null,
    children: [],
    pathFromRoot: [],
    paramMap: {} as any,
    queryParamMap: {} as any,
    title: ''
  };
}

function mockRouterStateSnapshot(): RouterStateSnapshot {
  return {} as RouterStateSnapshot;
}
