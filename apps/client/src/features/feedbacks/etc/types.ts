import { Nullable, OrNone } from '@/common/types/etc';
import { SqlTableT } from '@/core/store/api/etc/types';
import { UserT } from '@/features/user/etc/types';

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

export type ReplyT = SqlTableT<{
  content: string;
  replyingToId: string;
  replyingTo: UserT;
  user: UserT;
  commentId: string;
  userId: string;
}>;

export type CommentT = SqlTableT<{
  content: string;
  replies: Nullable<ReplyT[]>;
  user: UserT;
  userId: string;
}>;

export type FeedbackT = SqlTableT<{
  title: string;
  category: FeedbackCatT;
  upvotes: number;
  status: FeedbackStatusT;
  description: string;
  comments: OrNone<CommentT[]>;
  commentsCount: number;
}>;
