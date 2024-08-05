import { Injectable } from '@angular/core';
import {
  concatMap,
  delay,
  forkJoin,
  from,
  map,
  mergeMap,
  Observable,
  toArray
} from "rxjs";

import { BaseHttpService } from "@core/services/base-http.service";
import { IHeroInterface, IResponseHero } from "@shared/interface/hero.interface";
import { IStarship } from "@shared/interface/starships.interface";
import { IFilmsInterface } from "@shared/interface/films.interface";

@Injectable({
  providedIn: 'root'
})
export class StarWarsApiService {

  constructor(private http: BaseHttpService) {
  }

  getHeroes(page = 1): Observable<IResponseHero> {
    return this.http.get<IResponseHero>(`people/?page=${page}`).pipe(
    );
  }

  getStarshipDetails(id: number): Observable<IStarship> {
    return this.http.get<IStarship>(`starships/${id}`)
  }

  private getFilmDetails(id: number): Observable<IFilmsInterface> {
    return this.http.get<IFilmsInterface>(`films/${id}`)
  }

  getHeroDetails(id: number): Observable<IHeroInterface> {
    return this.http.get<IHeroInterface>(`people/${id}`).pipe(
      mergeMap(hero =>
        forkJoin({
          films: this.getFilmsWithDetails(hero.films),
          ships: this.getStarshipWithDetails(hero.starships)
        }).pipe(
          map(({ films, ships }) => this.enrichHeroWithFilmsAndShips(hero, films, ships))
        ),
      ),
    );
  }

  private getFilmsWithDetails(filmIds: number[]): Observable<IFilmsInterface[]> {
    return from(filmIds).pipe(
      concatMap(id =>
        this.getFilmDetails(id).pipe(
          delay(200)
        )),
      toArray()
    );
  }

  private getStarshipWithDetails(starshipIds: number[]): Observable<IStarship[]> {
    return from(starshipIds).pipe(
      concatMap(id =>
        this.getStarshipDetails(id).pipe(
          delay(200)
        )),
      toArray()
    );
  }

  private createFilmsShipMap(films: IFilmsInterface[]): Map<number, number[]> {
    return films.reduce((map, film) => {
      film.starships.forEach(ship => {
        if (!map.has(ship)) {
          map.set(ship, []);
        }
        map.get(ship)!.push(film.id);
      });
      return map;
    }, new Map<number, number[]>());
  }

  private enrichHeroWithFilmsAndShips(hero: IHeroInterface, films: IFilmsInterface[], ships: IStarship[]): any {
    const filmsShipMap = this.createFilmsShipMap(films);
    const filmShips = hero.starships.map(shipId => ({
      shipId,
      films: filmsShipMap.get(shipId) || []
    }));

    return { ...hero, films, filmsShips: filmShips, starships: ships };
  }
}
