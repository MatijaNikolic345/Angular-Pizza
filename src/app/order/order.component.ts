import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppComponentService } from '../app-component.service';
import { API_URL, getMenu } from '../store/restaurantApi';
import { NgFor, NgIf } from '@angular/common';
import { cartItemType } from '../store/cart-slice/cart.actions';
import { PizzaType } from '../menu/menu.component';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent implements OnInit {
  params: any;
  order: any;
  isPrio: false;
  orderStatus: false;
  estimatedDelivery: any;
  cart: cartItemType[];
  totalCartPrice: number;
  id: string;
  menuList: PizzaType[];
  constructor(
    private route: ActivatedRoute,
    private appService: AppComponentService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loadMenu();
    this.route.params.subscribe((value: any) => {
      this.params = value['id'];
      this.getOrderData(this.params);
    });
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
  async getOrderData(id: string) {
    this.appService.setLoadState(true);
    this.order = await this.getOrder(id);
    this.appService.setLoadState(false);
    this.isPrio = this.order.priority;
    this.orderStatus = this.order.status;
    this.cart = this.order.cart;
    this.id = id;
    this.totalCartPrice = this.cart.reduce(
      (acc, cur) => (acc = acc + cur.totalPrice),
      0
    );
    this.estimatedDelivery = this.order.estimatedDelivery;
    console.log(this.order);
  }
  async getOrder(id: any) {
    const res = await fetch(`${API_URL}/order/${id}`);
    if (!res.ok) {
      this.appService.setLoadState(false);
      this.router.navigate(['/error']);
      throw Error(`Couldn't find order #${id}`);
    }

    const { data } = await res.json();
    return data;
  }
  formatCurrency(value: number) {
    return new Intl.NumberFormat('en', {
      style: 'currency',
      currency: 'EUR',
    }).format(value);
  }
  formatDate(dateStr: any) {
    if (!this.estimatedDelivery) return;
    return new Intl.DateTimeFormat('en', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateStr));
  }

  calcMinutesLeft(dateStr: any) {
    const d1 = new Date().getTime();
    const d2 = new Date(dateStr).getTime();
    return Math.round((d2 - d1) / 60000);
  }
  getIngredients(id: number) {
    if (!this.menuList) return;
    const ingredients = this.menuList
      .map((item: PizzaType) => {
        if (item.id === id) return item.ingredients;
        return;
      })
      .filter((item: any) => item, typeof Array)[0];
    return ingredients?.join(', ');
  }
}
