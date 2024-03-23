import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainCartComponent } from './cart/main-cart/main-cart.component';
import { ErrorComponent } from './error/error.component';
import { MenuComponent } from './menu/menu.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { OrderComponent } from './order/order.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'cart', component: MainCartComponent, pathMatch: 'full' },
  { path: 'menu', component: MenuComponent, pathMatch: 'full' },
  { path: 'menu', component: MenuComponent, pathMatch: 'full' },
  {
    path: 'order',
    children: [
      { path: 'new', component: NewOrderComponent },
      { path: ':id', component: OrderComponent },
    ],
  },
  { path: 'error', component: ErrorComponent, pathMatch: 'full' },
  { path: '*', component: ErrorComponent,},
];
