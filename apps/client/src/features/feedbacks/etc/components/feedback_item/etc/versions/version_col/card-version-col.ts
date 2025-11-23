import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UseTabletDir } from '@/core/services/use_tablet';
import { CategorySpan } from '../../fragments/category_span/category-span';
import { CommentsCount } from '../../fragments/comments_count/comments-count';
import { UseCardVersioningDir } from '../../directives/use_card_versioning';
import { BtnVotesBase } from '@/common/components/btns/btn_votes/btn_votes_base/btn-votes-base';

@Component({
  selector: 'app-card-version-col',
  imports: [UseTabletDir, CategorySpan, CommentsCount, BtnVotesBase],
  templateUrl: './card-version-col.html',
  styleUrl: './card-version-col.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VersionCol extends UseCardVersioningDir {}
