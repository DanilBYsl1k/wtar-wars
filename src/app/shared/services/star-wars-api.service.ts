import { Injectable } from '@angular/core';
import { concatMap, forkJoin, map, mergeAll, mergeMap, Observable, of, switchMap, tap } from "rxjs";

import { BaseHttpService } from "@core/services/base-http.service";
import { IResponseHero } from "@shared/interface/hero.interface";

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

  getHeroDetails(id: number): Observable<any> {
    return this.http.get(`people/${id}`).pipe(
      tap(hero => console.log('Hero:', hero)),
      mergeMap((hero: any) => {
        let a = [];

        let z = hero.starships.map((ship: number)=> this.getStarshipDetails(ship))

        return forkJoin(z)
      })
    );
  }

  getFilmDetails(id: number): Observable<any> {
    return this.http.get(`films/${id}`);
  }

  getStarshipDetails(id: number): Observable<any> {
    return this.http.get(`starships/${id}`);
  }

}
