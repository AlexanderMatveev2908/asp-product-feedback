import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BtnVotes } from '@/common/components/btns/btn_votes/btn-votes';
import { UseTabletDir } from '@/core/services/use_tablet';
import { CategorySpan } from '../../fragments/category_span/category-span';
import { CommentsCount } from '../../fragments/comments_count/comments-count';
import { UseCardVersioningDir } from '../../directives/use_card_versioning';

@Component({
  selector: 'app-card-version-row',
  imports: [BtnVotes, UseTabletDir, CategorySpan, CommentsCount],
  templateUrl: './card-version-row.html',
  styleUrl: './card-version-row.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VersionRow extends UseCardVersioningDir {}
