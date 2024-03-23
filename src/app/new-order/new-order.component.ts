import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { cartType } from '../store/cart-slice/cart.reducer';
import { userType } from '../store/user-slice/user.reducer';
import { FormsModule, NgForm } from '@angular/forms';
import { createOrder, getAddress } from '../store/restaurantApi';
import { CommonModule } from '@angular/common';
import { clearCart } from '../store/cart-slice/cart.actions';
type storeType = {
  cart: cartType;
  user: userType;
};
@Component({
  selector: 'app-new-order',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './new-order.component.html',
  styleUrl: './new-order.component.css',
})
export class NewOrderComponent {
  $cartStore: Observable<cartType>;
  cartSub: Subscription;
  cart: cartType;
  user$: Observable<userType>;
  usernameSub: Subscription;
  username: string;
  totalCartPrice: number;
  address: string;

  constructor(private router: Router, private store: Store<storeType>) {
    this.$cartStore = this.store.select('cart');
    this.cartSub = this.$cartStore.subscribe((value: cartType) => {
      this.cart = value;
      this.totalCartPrice = this.cart.reduce(
        (acc, cur) => (acc = acc + cur.totalPrice),
        0
      );
    });
    this.user$ = this.store.select('user');
    this.usernameSub = this.user$.subscribe((value: userType) => {
      this.username = value.username;
    });
    if (this.cart.length < 1) this.router.navigate(['/cart']);
  }

  ngOnDestroy(): void {
    this.usernameSub.unsubscribe();
    this.cartSub.unsubscribe();
  }
  formatCurrency(value: number) {
    return new Intl.NumberFormat('en', {
      style: 'currency',
      currency: 'EUR',
    }).format(value);
  }
  async onSubmit(f: NgForm) {
    if (f.invalid) return;

    const order = {
      ...f.value,
      cart: this.cart,
      priority: f.value.priority === true,
    };

    const newOrder = await createOrder(order);
    console.log(newOrder);
    this.store.dispatch(clearCart());
    this.router.navigate([`/order/${newOrder.id}`]);
  }
  getPosition() {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }
  async getAddress() {
    const positionObj: any = await this.getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    this.address = address;
  }
}
