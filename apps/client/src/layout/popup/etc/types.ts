import { AppEventT } from '@/common/types/etc';

export interface PopupStaticPropsT {
  closeOnMouseOut: boolean;
  eventT: AppEventT;
  closePop: () => void;
}
