import { SqlTableT } from '@/core/store/api/etc/types';
import { ImageT } from '@/features/feedbacks/etc/types';

export type UserT = SqlTableT<{
  name: string;
  username: string;
  image: ImageT;
}>;
