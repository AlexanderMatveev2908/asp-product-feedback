import { noticeReducer, NoticeStateT } from '@/features/notice/reducer/reducer';
import { productsReducer, ProductsStateT } from '@/features/products/reducer/reducer';
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
  products: ProductsStateT;
}

export const rootReducer: ActionReducerMap<StoreStateT> = {
  toast: toastReducer,
  notice: noticeReducer,
  sidebarMobile: sidebarMobileReducer,
  products: productsReducer,
};
