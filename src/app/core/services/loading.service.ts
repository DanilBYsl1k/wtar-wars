import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, interval, Observable, takeUntil, take } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private stopLoading$ = new Subject<boolean>();
  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  constructor() { }

  show() {
    this.loadingSubject.next(true);
    this.stopLoading$.next(false);
  }

  hide() {
    interval(500).pipe(
      take(1),
      takeUntil(this.stopLoading$)
    ).subscribe(() => {
      this.loadingSubject.next(false);
    });
  }
}
