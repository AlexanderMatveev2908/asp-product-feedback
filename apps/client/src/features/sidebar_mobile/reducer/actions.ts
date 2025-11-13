import { BoolPayloadT } from '@/common/types/etc';
import { createAction, props } from '@ngrx/store';

export const SidebarMobileActT = {
  RESET__SIDEBAR_MOBILE_STATE: createAction('RESET__SIDEBAR_MOBILE_STATE'),
  SET_OPEN: createAction('SET_OPEN', props<BoolPayloadT>()),
};
