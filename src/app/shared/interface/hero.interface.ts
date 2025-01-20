import { IFilmsInterface } from "@shared/interface/films.interface";
import { IStarship } from "@shared/interface/starships.interface";
import { ShipsFilmsType } from "@shared/types/ships-films.type";

export interface IBaseHeroInterface {
  birth_year: string
  created: string
  edited: string
  eye_color: string
  gender: string
  hair_color: string
  height: string
  homeworld: number
  id: number
  mass: string
  name: string
  skin_color: string
  species: number[]
  url: string
}

export interface IHeroInterface extends IBaseHeroInterface {
  starships: number[]
  films: number[]
}

export interface IResponseHero {
  count: number;
  next: string;
  previous: string;
  results: IHeroInterface[];
  page: number
}

export interface FullInfoHero extends IBaseHeroInterface {
  starships: IStarship[];
  films: IFilmsInterface[];
  filmsShips: ShipsFilmsType
}
