import { createAction } from '@ngrx/store';

export const WakeUpActT = {
  RESET__WAKE_UP_STATE: createAction('RESET__WAKE_UP_STATE'),
  SET_AWAKE: createAction('SET_AWAKE'),
};
