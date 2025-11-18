import { createReducer, on } from '@ngrx/store';
import { UserActT } from './actions';
import { Nullable } from '@/common/types/etc';
import { UserT } from '../etc/types';

export interface UserStateT {
  user: Nullable<UserT>;
}

export const initState: UserStateT = {
  user: null,
};

export const userReducer = createReducer(
  initState,
  on(UserActT.RESET__USER_STATE, (_: UserStateT) => initState),
  on(UserActT.SET_USER, (state: UserStateT, act: UserT) => ({ ...state, user: act }))
);
