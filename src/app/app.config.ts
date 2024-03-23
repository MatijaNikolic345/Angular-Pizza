import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { userReducer } from './store/user-slice/user.reducer';
import { cartReducer } from './store/cart-slice/cart.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({ user: userReducer, cart: cartReducer }),
    provideEffects(),
  ],
};
