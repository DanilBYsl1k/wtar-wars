import { Injectable } from '@angular/core';
import { forkJoin, map,  mergeMap, Observable } from "rxjs";

import { BaseHttpService } from "@core/services/base-http.service";
import { IHeroInterface, IResponseHero } from "@shared/interface/hero.interface";

@Injectable({
  providedIn: 'root'
})
export class StarWarsApiService {

  constructor(private http: BaseHttpService) {
  }

  getHeroes(page = 1): Observable<IResponseHero> {
    return this.http.get<IResponseHero>(`people/?page=${ page }`).pipe(
    );
  }

  getHeroDetails(id: number): Observable<any> {
    return this.http.get<IHeroInterface>(`people/${ id }`).pipe(
      mergeMap((hero) => {
        let filmsDetails = hero.films.map((num) => this.getFilmDetails(num))
        return forkJoin([ ...filmsDetails ]).pipe(
          map((films) => {
            return {...hero, films}
          }),
          map((a: any) => {
            a.films.forEach((num: any) => {
              let w = num.starships.find((z: any) => {
                console.log(z)
              });

              console.log(
                hero.starships.find((a)=> {

                })
              )
            })
            return a;
          })
        )
      })
    );
  }

  getFilmDetails(id: number): Observable<any> {
    return this.http.get(`films/${ id }`);
  }

  getStarshipDetails(id: number): Observable<any> {
    return this.http.get(`starships/${ id }`);
  }

}
