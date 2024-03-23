import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { cartType } from '../../store/cart-slice/cart.reducer';
import { Store } from '@ngrx/store';
import { userType } from '../../store/user-slice/user.reducer';
import { NgIf } from '@angular/common';
type storeType = {
  cart: cartType;
  user: userType;
};
@Component({
  selector: 'app-cart-popup',
  standalone: true,
  imports: [NgIf],
  templateUrl: './cart-popup.component.html',
  styleUrl: './cart-popup.component.css',
})
export class CartPopupComponent {
  $cartStore: Observable<cartType>;
  cartSub: Subscription;
  cart: cartType;
  pizzaQuantity: number;
  totalPizzaPrice: number;
  constructor(private router: Router, private store: Store<storeType>) {
    this.$cartStore = this.store.select('cart');
    this.cartSub = this.$cartStore.subscribe((value: cartType) => {
      this.cart = value;
      this.pizzaQuantity = this.cart.reduce(
        (acc, cur) => (acc = acc + cur.quantity),
        0
      );
      this.totalPizzaPrice = this.cart.reduce(
        (acc, cur) => (acc = acc + cur.totalPrice),
        0
      );
    });
  }
  formatCurrency(value: number) {
    return new Intl.NumberFormat('en', {
      style: 'currency',
      currency: 'EUR',
    }).format(value);
  }
  openCart() {
    this.router.navigate(['/cart']);
  }
}
