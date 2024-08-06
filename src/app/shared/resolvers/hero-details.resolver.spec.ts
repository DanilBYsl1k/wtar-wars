// import { TestBed } from '@angular/core/testing';
// import { ResolveFn } from '@angular/router';
//
// import { heroDetailsResolver } from './hero-details.resolver';
// import { Observable, of } from "rxjs";
// import { FullInfoHero } from "@shared/interface/hero.interface";
// import { StarWarsApiService } from "@shared/services/star-wars-api.service";
//
// describe('heroDetailsResolver', () => {
//   let starWarsApiServiceSpy: jasmine.SpyObj<StarWarsApiService>;
//   const mockHero: FullInfoHero = { id: '1', name: 'Luke Skywalker', ... };
//
//   const executeResolver: ResolveFn<Observable<FullInfoHero>> = (...resolverParameters) =>
//     TestBed.runInInjectionContext(() => heroDetailsResolver(...resolverParameters));
//
//   beforeEach(() => {
//     const spy = jasmine.createSpyObj('StarWarsApiService', ['getHeroDetails']);
//
//     TestBed.configureTestingModule({
//       providers: [
//         { provide: StarWarsApiService, useValue: spy }
//       ]
//     });
//
//     starWarsApiServiceSpy = TestBed.inject(StarWarsApiService) as jasmine.SpyObj<StarWarsApiService>;
//   });
//
//   it('should be created', () => {
//     expect(executeResolver).toBeTruthy();
//   });
//
//   it('should resolve hero details', () => {
//     const route = { params: { id: '1' } } as any;
//     starWarsApiServiceSpy.getHeroDetails.and.returnValue(of(mockHero));
//
//     executeResolver(route).subscribe(result => {
//       expect(result).toEqual(mockHero);
//     });
//
//     expect(starWarsApiServiceSpy.getHeroDetails.calls.count()).toBe(1, 'one call');
//     expect(starWarsApiServiceSpy.getHeroDetails.calls.mostRecent().args[0]).toBe('1');
//   });
// });
