import { Nullable, OrNone } from '@/common/types/etc';
import { SqlTableT } from '@/core/store/api/etc/types';

export enum FeedbackCatT {
  UI = 'UI',
  UX = 'UX',
  FEATURE = 'FEATURE',
  ENHANCEMENT = 'ENHANCEMENT',
  BUG = 'BUG',
}

export enum FeedbackStatusT {
  SUGGESTION = 'SUGGESTION',
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN_PROGRESS',
  LIVE = 'LIVE',
}

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
  description: string;
  comments: OrNone<CommentT[]>;
}>;
