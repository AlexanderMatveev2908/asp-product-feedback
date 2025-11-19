import { createAction, props } from '@ngrx/store';
import { FeedbackT } from '../etc/types';
import { BoolPayloadT } from '@/common/types/etc';

export const FeedbacksActT = {
  RESET__FEEDBACKS_STATE: createAction('RESET__FEEDBACKS_STATE'),
  SET_FEEDBACKS: createAction('SET_FEEDBACKS', props<{ feedbacks: FeedbackT[] }>()),
  REFETCH: createAction('REFETCH'),
  SET_PENDING: createAction('SET_PENDING', props<BoolPayloadT>()),
};
