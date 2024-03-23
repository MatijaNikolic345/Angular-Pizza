import { createAction, props } from '@ngrx/store';

export type cartItemType = {
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};
export const addToCart = createAction(
  '[cart] addToCart',
  props<{ value: cartItemType }>()
);

export const clearCart = createAction('[cart] clearCart');

export const increaseQuantity = createAction(
  '[cart] increaseQuantity',
  props<{ value: number }>()
);
export const decreaseQuantity = createAction(
  '[cart] decreaseQuantity',
  props<{ value: number; quantity: number }>()
);
export const deleteItem = createAction(
  '[cart] deleteItem',
  props<{ value: number }>()
);
