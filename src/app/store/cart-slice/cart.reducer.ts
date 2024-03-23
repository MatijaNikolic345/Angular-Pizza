import { createReducer, on } from '@ngrx/store';
import {
  addToCart,
  cartItemType,
  clearCart,
  decreaseQuantity,
  deleteItem,
  increaseQuantity,
} from './cart.actions';
export type cartType = {
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}[];
const initialState: cartType = [];
export const cartReducer = createReducer(
  initialState,
  on(addToCart, (state, action) => [...state, action.value]),
  on(clearCart, (state, action) => []),
  on(increaseQuantity, (state, action) =>
    state.map((cartItem: cartItemType) => {
      if (action.value === cartItem.pizzaId)
        return {
          ...cartItem,
          quantity: cartItem.quantity + 1,
          totalPrice: cartItem.unitPrice * (cartItem.quantity + 1),
        };
      return cartItem;
    })
  ),
  on(decreaseQuantity, (state, action) => {
    if (action.quantity === 1) {
      return state.filter(
        (cartItem: cartItemType) => cartItem.pizzaId !== action.value
      );
    }
    return state.map((cartItem: cartItemType) => {
      if (action.value === cartItem.pizzaId)
        return {
          ...cartItem,
          quantity: cartItem.quantity - 1,
          totalPrice: cartItem.unitPrice * (cartItem.quantity - 1),
        };
      return cartItem;
    });
  }),
  on(deleteItem, (state, action) =>
    state.filter((cartItem: cartItemType) => cartItem.pizzaId !== action.value)
  )
);
