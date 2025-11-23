import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BtnVotes } from '@/common/components/btns/btn_votes/btn-votes';
import { UseCardVersioningDir } from '../directives/use_card_versioning';
import { UseTabletDir } from '@/core/services/use_tablet';
import { CategorySpan } from '../category_span/category-span';
import { CommentsCount } from '../comments_count/comments-count';

@Component({
  selector: 'app-card-version-col',
  imports: [BtnVotes, UseTabletDir, CategorySpan, CommentsCount],
  templateUrl: './card-version-col.html',
  styleUrl: './card-version-col.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VersionCol extends UseCardVersioningDir {}
