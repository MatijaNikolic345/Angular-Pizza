import { createAction, props } from '@ngrx/store';

export const getUsername = createAction(
  '[user] getName',
  props<{ value: string }>()
);


