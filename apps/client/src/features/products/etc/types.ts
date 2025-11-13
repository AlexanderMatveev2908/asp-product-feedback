import { Nullable, OrNone } from '@/common/types/etc';
import { SqlTableT } from '@/core/store/api/etc/types';

export type ProductCatT = 'ui' | 'ux' | 'feature' | 'enhancement' | 'bug';

export type ProductStatusT = 'suggestion' | 'planned' | 'in_progress' | 'live';

export type ImageT = SqlTableT<{
  publicId: string;
  url: string;
}>;

// ? after Java server build endpoint this dev type will be removed 🛠️
export type ImageDevT = string;

export type UserT = SqlTableT<{
  name: string;
  username: string;
  image: ImageT | ImageDevT;
}>;

export type CommentT = SqlTableT<{
  content: string;
  user: UserT;
}>;

export type ProductT = SqlTableT<{
  title: string;
  category: ProductCatT;
  upvotes: number;
  status: ProductStatusT;
  description: Nullable<string>;
  comments: OrNone<CommentT[]>;
}>;
