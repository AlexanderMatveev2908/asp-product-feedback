import { createReducer, on } from '@ngrx/store';
import { FeedbacksActT } from './actions';
import { FeedbackT } from '../etc/types';
import { Nullable } from '@/common/types/etc';

export interface FeedbacksStateT {
  feedbacks: Nullable<FeedbackT[]>;
}

export const initState: FeedbacksStateT = {
  feedbacks: null,
};

export const feedbacksReducer = createReducer(
  initState,
  on(FeedbacksActT.RESET__FEEDBACKS_STATE, (_: FeedbacksStateT) => initState),
  on(FeedbacksActT.SET_FEEDBACKS, (state: FeedbacksStateT, act: { feedbacks: FeedbackT[] }) => ({
    ...state,
    feedbacks: act.feedbacks,
  }))
);
