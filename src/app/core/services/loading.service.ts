import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, interval, Observable, takeUntil } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean> = this.loadingSubject.asObservable()
  private stopLoading$ = new Subject<boolean>();

  constructor() { }

  show() {
    this.loadingSubject.next(true);
    this.stopLoading$.next(false)
  }

  hide() {
    interval(1000).pipe(
      takeUntil(this.stopLoading$)
    ).subscribe(()=> {
      this.loadingSubject.next(false);
    })
  }
}
