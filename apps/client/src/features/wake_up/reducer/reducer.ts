import { createReducer, on } from '@ngrx/store';
import { WakeUpActT } from './actions';

export interface WakeUpStateT {
  awake: boolean;
}

export const initState: WakeUpStateT = {
  awake: false,
};

export const wakeUpReducer = createReducer(
  initState,
  on(WakeUpActT.RESET__WAKE_UP_STATE, (_: WakeUpStateT) => initState),
  on(WakeUpActT.SET_AWAKE, (_: WakeUpStateT) => ({ awake: true }))
);
