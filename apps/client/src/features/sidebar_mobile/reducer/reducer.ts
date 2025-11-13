import { createReducer, on } from '@ngrx/store';
import { SidebarMobileActT } from './actions';
import { BoolPayloadT } from '@/common/types/etc';

export interface SidebarMobileStateT {
  isOpen: boolean;
}

export const initState: SidebarMobileStateT = {
  isOpen: false,
};

export const sidebarMobileReducer = createReducer(
  initState,
  on(SidebarMobileActT.RESET__SIDEBAR_MOBILE_STATE, (_: SidebarMobileStateT) => initState),
  on(SidebarMobileActT.SET_OPEN, (state: SidebarMobileStateT, act: BoolPayloadT) => ({
    isOpen: act.v,
  }))
);
