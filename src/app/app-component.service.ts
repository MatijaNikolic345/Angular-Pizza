import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppComponentService {
  loading = false;
  event2 = new Subject<boolean>();
  constructor() {}
  setLoadState(loadState: boolean) {
    this.loading = loadState;
    this.event2.next(this.loading);
  }
}
