import { Injectable } from '@angular/core';
import {
  catchError,
  concatMap,
  delay,
  forkJoin,
  from,
  map,
  mergeMap,
  Observable,
  of,
  toArray
} from "rxjs";

import { BaseHttpService } from "@core/services/base-http.service";
import { FullInfoHero, IHeroInterface, IResponseHero } from "@shared/interface/hero.interface";
import { IStarship } from "@shared/interface/starships.interface";
import { IFilmsInterface } from "@shared/interface/films.interface";
import { ShipsFilmsType } from "@shared/types/ships-films.type";
import { Router } from "@angular/router";

type shipAndFilmMap = Map<number, number[]>;

@Injectable({
  providedIn: 'root'
})
export class StarWarsApiService {

  constructor(private http: BaseHttpService, private router: Router) {}

  getHeroes(page = 1): Observable<IResponseHero> {
    return this.http.get<IResponseHero>(`people/?page=${page}`).pipe(
      map((value)=> {
        return {...value, page }
      }),
      catchError((error)=> {
        if (error.status === 404){
          this.router.navigate([''], { queryParams: { page: 1} });
          return  this.getHeroes();
        }
        return  of(error)
      })
    );
  }

  getStarshipDetails(id: number): Observable<IStarship> {
    return this.http.get<IStarship>(`starships/${id}`)
  }

  private getFilmDetails(id: number): Observable<IFilmsInterface> {
    return this.http.get<IFilmsInterface>(`films/${id}`)
  }

  getHeroDetails(id: number): Observable<FullInfoHero> {
    return this.http.get<IHeroInterface>(`people/${id}`).pipe(
      mergeMap(hero =>
        forkJoin({
          films: this.getFilmsWithDetails(hero.films),
          ships: this.getStarshipWithDetails(hero.starships)
        }).pipe(
          map(({ films, ships }) => this.enrichHeroWithFilmsAndShips(hero, films, ships))
        ),
      )
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

  private createFilmsShipMap(films: IFilmsInterface[]): shipAndFilmMap {
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

  private enrichHeroWithFilmsAndShips(
    hero: IHeroInterface,
    films: IFilmsInterface[],
    ships: IStarship[]): FullInfoHero {
    const filmsShipMap: shipAndFilmMap = this.createFilmsShipMap(films);
    const filmShips: ShipsFilmsType = hero.starships.map(shipId => ({
      shipId,
      films: filmsShipMap.get(shipId) || []
    }));

    return { ...hero, films, filmsShips: filmShips, starships: ships };
  }
}
