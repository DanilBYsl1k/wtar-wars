export interface IHeroInterface {
  birth_year:  string
  created: string
  edited:  string
  eye_color:  string
  films: number[]
  gender:  string
  hair_color:  string
  height:  string
  homeworld: number
  id: number
  mass:  string
  name:  string
  skin_color:  string
  species: number[]
  starships: number[]
  url:  string
}

export interface IResponseHero {
  count: number;
  next: string;
  previous: string;
  results: IHeroInterface[];
}
