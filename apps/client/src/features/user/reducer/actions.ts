import { createAction, props } from '@ngrx/store';
import { User } from '../etc/types';

export const UserActT = {
  RESET__USER_STATE: createAction('RESET__USER_STATE'),
  SET_USER: createAction('SET_USER', props<User>()),
};
