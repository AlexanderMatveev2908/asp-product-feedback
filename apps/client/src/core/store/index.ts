import { noticeReducer, NoticeStateT } from '@/features/notice/reducer/reducer';
import { feedbacksReducer, FeedbacksStateT } from '@/features/feedbacks/reducer/reducer';
import {
  sidebarMobileReducer,
  SidebarMobileStateT,
} from '@/features/sidebar_mobile/reducer/reducer';
import { toastReducer, ToastStateT } from '@/features/toast/reducer/reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface StoreStateT {
  toast: ToastStateT;
  notice: NoticeStateT;
  sidebarMobile: SidebarMobileStateT;
  feedbacks: FeedbacksStateT;
}

export const rootReducer: ActionReducerMap<StoreStateT> = {
  toast: toastReducer,
  notice: noticeReducer,
  sidebarMobile: sidebarMobileReducer,
  feedbacks: feedbacksReducer,
};
