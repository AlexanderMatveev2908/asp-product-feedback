import { Nullable, OrNone } from '@/common/types/etc';
import { SqlTableT } from '@/core/store/api/etc/types';

export type FeedbackCatT = 'ui' | 'ux' | 'feature' | 'enhancement' | 'bug';

export type FeedbackStatusT = 'suggestion' | 'planned' | 'in_progress' | 'live';

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

export type ReplyT = SqlTableT<{
  content: string;
  replyingTo: string;
  user: UserT;
}>;

export type CommentT = SqlTableT<{
  content: string;
  replies: Nullable<ReplyT[]>;
  user: UserT;
}>;

export type FeedbackT = SqlTableT<{
  title: string;
  category: FeedbackCatT;
  upvotes: number;
  status: FeedbackStatusT;
  description: Nullable<string>;
  comments: OrNone<CommentT[]>;
}>;
