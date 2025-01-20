import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { BaseHttpService } from '@core/services/base-http.service';
import { StarWarsApiService } from './star-wars-api.service';
import { IResponseHero, FullInfoHero } from '@shared/interface/hero.interface';
import { IStarship } from '@shared/interface/starships.interface';
import { IFilmsInterface } from '@shared/interface/films.interface';
import { mockFilm, mockHero, mockResponse, mockStarship } from "@shared/mock/data.mock";

describe('StarWarsApiService', () => {
  let service: StarWarsApiService;
  let http: jasmine.SpyObj<BaseHttpService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const httpSpy = jasmine.createSpyObj('BaseHttpService', ['get']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        StarWarsApiService,
        { provide: BaseHttpService, useValue: httpSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    service = TestBed.inject(StarWarsApiService);
    http = TestBed.inject(BaseHttpService) as jasmine.SpyObj<BaseHttpService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    router.navigate.calls.reset();
  });

  describe('getFilmsWithDetails', () => {
    it('should return an array of film details', () => {

      http.get.and.callFake((url: string) => {
        const filmId = parseInt(url.split('/').pop()!, 10);
        if (filmId === 1) {
          return of(mockFilm);
        }
        return of(null as any); // Указываем тип any для несовпадающих случаев
      });

      service.getFilmsWithDetails([1]).subscribe(response => {
        expect(response).toEqual([mockFilm]);
      });
    });
  });

  describe('getStarshipWithDetails', () => {
    it('should return an array of starship details', () => {
      http.get.and.callFake((url: string) => {
        const starshipId = parseInt(url.split('/').pop()!, 10);
        if (starshipId === 1) {
          return of(mockStarship);
        }
        return of(null as any);
      });

      service.getStarshipWithDetails([1]).subscribe(response => {
        expect(response).toEqual([mockStarship]);
      });
    });
  });
  describe('getHeroDetails', () => {
    let routerSpy: jasmine.SpyObj<Router>;

    beforeEach(() => {
      routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
      routerSpy.navigate.calls.reset();
    });

    it('should return hero details with films and starships', () => {
      spyOn(service, 'getFilmsWithDetails').and.returnValue(of([mockFilm]));
      spyOn(service, 'getStarshipWithDetails').and.returnValue(of([mockStarship]));
      http.get.and.returnValue(of(mockHero));

      service.getHeroDetails(1).subscribe(response => {
        const expected: FullInfoHero = {
          ...mockHero,
          films: [mockFilm],
          filmsShips: [{ shipId: 1, films: [1] }],
          starships: [mockStarship]
        };
        expect(response).toEqual(expected);
      });
    });

    it('should handle errors and navigate', () => {
      http.get.and.returnValue(throwError({ status: 404 }));
      service.getHeroDetails(1).subscribe(() => {
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
      });
    });
  });

  describe('getHeroes', () => {
    it('should return heroes with page info', () => {

      http.get.and.returnValue(of(mockResponse));

      service.getHeroes(1).subscribe(response => {
        expect(response).toEqual({ ...mockResponse, page: 1 });
      });
    });

    it('should handle 404 errors and navigate', () => {

      http.get.and.returnValue(throwError({ status: 404 }));

      service.getHeroes(1).subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith(['/'], { queryParams: { page: 1 } });
      });
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
