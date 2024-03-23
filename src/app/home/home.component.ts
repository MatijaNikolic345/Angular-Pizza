import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { getUsername } from '../store/user-slice/user.actions';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
type StoreType = {
  user: {
    username: string;
  };
};
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  @ViewChild('f') getUserForm!: NgForm;
  user$: Observable<{ username: string }>;
  usernameSub: Subscription;
  username: string;
  constructor(private store: Store<StoreType>, private router: Router) {
    this.user$ = store.select('user');
    this.usernameSub = this.user$.subscribe((value: { username: string }) => {
      this.username = value.username;
    });
  }

  ngOnDestroy(): void {
    this.usernameSub.unsubscribe();
  }
  onSubmit() {
    this.store.dispatch(getUsername({ value: this.getUserForm.value.name }));
    this.goToMenu();
  }
  goToMenu() {
    this.router.navigate(['/menu']);
  }
}
