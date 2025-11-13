import { AppPayloadEventT, Nullable } from '@/common/types/etc';
import { NoticeTmptT } from '@/features/notice/reducer/reducer';

export type NoticeWrapperPropsT = Omit<AppPayloadEventT, 'eventT'> & {
  tmpt: Nullable<NoticeTmptT>;
};
