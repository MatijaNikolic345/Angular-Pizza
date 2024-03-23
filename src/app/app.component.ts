import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainNavComponent } from './main-nav/main-nav.component';
import { CartPopupComponent } from './cart/cart-popup/cart-popup.component';
import { NgIf } from '@angular/common';
import { AppComponentService } from './app-component.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainNavComponent, CartPopupComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnDestroy, OnInit {
  // Sets initial value to true to show loading spinner on first load
  loading: boolean;
  loadingSub: Subscription;
  constructor(private appService: AppComponentService) {}
  ngOnInit(): void {
    this.loadingSub = this.appService.event2.subscribe((loadState: boolean) => {
      setTimeout(() => {
        this.loading = loadState;
      }, 0);
    });
  }
  ngOnDestroy(): void {
    this.loadingSub.unsubscribe();
  }
}
