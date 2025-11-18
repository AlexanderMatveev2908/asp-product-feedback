import { noticeReducer, NoticeStateT } from '@/features/notice/reducer/reducer';
import { feedbacksReducer, FeedbacksStateT } from '@/features/feedbacks/reducer/reducer';
import {
  sidebarMobileReducer,
  SidebarMobileStateT,
} from '@/features/sidebar_mobile/reducer/reducer';
import { toastReducer, ToastStateT } from '@/features/toast/reducer/reducer';
import { ActionReducerMap } from '@ngrx/store';
import { userReducer, UserStateT } from '@/features/user/reducer/reducer';
import { wakeUpReducer, WakeUpStateT } from '@/features/wake_up/reducer/reducer';

export interface StoreStateT {
  wakeUp: WakeUpStateT;
  toast: ToastStateT;
  notice: NoticeStateT;
  sidebarMobile: SidebarMobileStateT;
  feedbacks: FeedbacksStateT;
  user: UserStateT;
}

export const rootReducer: ActionReducerMap<StoreStateT> = {
  wakeUp: wakeUpReducer,
  toast: toastReducer,
  notice: noticeReducer,
  sidebarMobile: sidebarMobileReducer,
  feedbacks: feedbacksReducer,
  user: userReducer,
};
