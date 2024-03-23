import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { cartType } from '../../store/cart-slice/cart.reducer';
import { userType } from '../../store/user-slice/user.reducer';
import { NgFor, NgIf } from '@angular/common';
import {
  clearCart,
  decreaseQuantity,
  deleteItem,
  increaseQuantity,
} from '../../store/cart-slice/cart.actions';
type storeType = {
  cart: cartType;
  user: userType;
};
@Component({
  selector: 'app-main-cart',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './main-cart.component.html',
  styleUrl: './main-cart.component.css',
})
export class MainCartComponent implements OnDestroy {
  $cartStore: Observable<cartType>;
  cartSub: Subscription;
  cart: cartType;
  user$: Observable<userType>;
  usernameSub: Subscription;
  username: string;

  constructor(private router: Router, private store: Store<storeType>) {
    this.$cartStore = this.store.select('cart');
    this.cartSub = this.$cartStore.subscribe((value: cartType) => {
      this.cart = value;
    });
    this.user$ = this.store.select('user');
    this.usernameSub = this.user$.subscribe((value: userType) => {
      this.username = value.username;
    });
  }
  formatCurrency(value: number) {
    return new Intl.NumberFormat('en', {
      style: 'currency',
      currency: 'EUR',
    }).format(value);
  }
  ngOnDestroy(): void {
    this.usernameSub.unsubscribe();
    this.cartSub.unsubscribe();
  }
  backToMenu() {
    this.router.navigate(['/menu']);
  }
  orderPizzas() {
    this.router.navigate(['/order/new']);
  }
  onClearCart() {
    this.store.dispatch(clearCart());
  }
  onIncreaseQuantity(id: number) {
    this.store.dispatch(increaseQuantity({ value: id }));
  }
  onDecreaseQuantity(id: number, quantity: number) {
    this.store.dispatch(decreaseQuantity({ value: id, quantity: quantity }));
  }
  onDeletePizza(id: number) {
    this.store.dispatch(deleteItem({ value: id }));
  }
}
