import { Component, OnDestroy, OnInit } from '@angular/core';
import { getMenu } from '../store/restaurantApi';
import { CommonModule } from '@angular/common';
import { AppComponentService } from '../app-component.service';
import { Store } from '@ngrx/store';
import {
  addToCart,
  cartItemType,
  decreaseQuantity,
  deleteItem,
  increaseQuantity,
} from '../store/cart-slice/cart.actions';
import { cartType } from '../store/cart-slice/cart.reducer';
import { Observable, Subscription } from 'rxjs';
import { userType } from '../store/user-slice/user.reducer';
type storeType = {
  cart: cartType;
  user: userType;
};
export type PizzaType = {
  id: number;
  imageUrl: string;
  soldOut: boolean;
  name: string;
  unitPrice: number;
  ingredients: string[];
};
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit, OnDestroy {
  menuList: PizzaType[];
  $cartStore: Observable<cartType>;
  cartSub: Subscription;
  cart: cartType;
  constructor(
    private appService: AppComponentService,
    private store: Store<storeType>
  ) {
    this.$cartStore = this.store.select('cart');
    this.cartSub = this.$cartStore.subscribe((value: cartType) => {
      this.cart = value;
    });
  }
  ngOnDestroy(): void {
    this.cartSub.unsubscribe();
  }
  ngOnInit(): void {
    this.loadMenu();
  }

  async loadMenu() {
    try {
      this.appService.setLoadState(true);
      this.menuList = await getMenu();
      this.appService.setLoadState(false);
    } catch (err) {
      this.appService.setLoadState(false);
    }
  }
  formatCurrency(value: number) {
    return new Intl.NumberFormat('en', {
      style: 'currency',
      currency: 'EUR',
    }).format(value);
  }
  addPizzaToCart(pizza: PizzaType) {
    this.store.dispatch(
      addToCart({
        value: {
          unitPrice: pizza.unitPrice,
          name: pizza.name,
          pizzaId: pizza.id,
          quantity: 1,
          totalPrice: pizza.unitPrice,
        },
      })
    );
  }
  isInCartChecker(id: number) {
    const cartPizza = this.cart.filter(
      (cartItem: cartItemType) => cartItem.pizzaId === id
    );

    if (cartPizza.length >= 1) return true;
    return false;
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
  getCartQuantity(id: number) {
    const cartPizza = this.cart.filter(
      (cartItem: cartItemType) => cartItem.pizzaId === id
    );
    return cartPizza[0].quantity;
  }
}
