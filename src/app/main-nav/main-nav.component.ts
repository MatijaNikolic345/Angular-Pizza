import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { userType } from '../store/user-slice/user.reducer';
import { FormsModule, NgForm } from '@angular/forms';
type StoreType = {
  user: userType;
};
@Component({
  selector: 'app-main-nav',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './main-nav.component.html',
  styleUrl: './main-nav.component.css',
})
export class MainNavComponent implements OnDestroy {
  user$: Observable<userType>;
  usernameSub: Subscription;
  username: string;
  constructor(private store: Store<StoreType>, private router: Router) {
    this.user$ = store.select('user');
    this.usernameSub = this.user$.subscribe((value: userType) => {
      this.username = value.username;
    });
  }
  onClickHeading() {
    this.router.navigate(['']);
  }
  ngOnDestroy(): void {
    this.usernameSub.unsubscribe();
  }
  onSubmit(f: NgForm) {
    const id = f.value.id;
    this.router.navigate([`/order/${id}`]);
  }
}
