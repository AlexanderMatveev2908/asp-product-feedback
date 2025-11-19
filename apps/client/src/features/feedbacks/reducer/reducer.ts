import { createReducer, on } from '@ngrx/store';
import { FeedbacksActT } from './actions';
import { FeedbackT } from '../etc/types';
import { BoolPayloadT, Nullable } from '@/common/types/etc';

export interface FeedbacksStateT {
  feedbacks: Nullable<FeedbackT[]>;
  keyRefetch: number;
  isPending: boolean;
}

export const initState: FeedbacksStateT = {
  feedbacks: null,
  keyRefetch: 0,
  isPending: false,
};

export const feedbacksReducer = createReducer(
  initState,
  on(FeedbacksActT.RESET__FEEDBACKS_STATE, (_: FeedbacksStateT) => initState),
  on(FeedbacksActT.SET_FEEDBACKS, (state: FeedbacksStateT, act: { feedbacks: FeedbackT[] }) => ({
    ...state,
    feedbacks: act.feedbacks,
  })),
  on(FeedbacksActT.REFETCH, (state: FeedbacksStateT) => ({
    ...state,
    keyRefetch: state.keyRefetch + 1,
  })),
  on(FeedbacksActT.SET_PENDING, (state: FeedbacksStateT, act: BoolPayloadT) => ({
    ...state,
    isPending: act.v,
  }))
);
