import { createAction, props } from '@ngrx/store';
import { FeedbackT } from '../etc/types';

export const FeedbacksActT = {
  RESET__FEEDBACKS_STATE: createAction('RESET__FEEDBACKS_STATE'),
  SET_FEEDBACKS: createAction('SET_FEEDBACKS', props<{ feedbacks: FeedbackT[] }>()),
};
