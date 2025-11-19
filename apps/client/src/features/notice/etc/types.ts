import { Nullable } from '@/common/types/etc';
import { NoticeStateT, NoticeTmptT } from '../reducer/reducer';

export type PartialNotice = Omit<NoticeStateT, 'cb' | 'tmpt'> & {
  cb?: Nullable<() => void>;
  tmpt?: Nullable<NoticeTmptT>;
};
