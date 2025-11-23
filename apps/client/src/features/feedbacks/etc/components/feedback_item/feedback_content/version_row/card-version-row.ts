import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BtnVotes } from '@/common/components/btns/btn_votes/btn-votes';
import { UseCardVersioningDir } from '../directives/use_card_versioning';
import { UseTabletDir } from '@/core/services/use_tablet';

@Component({
  selector: 'app-card-version-row',
  imports: [BtnVotes, UseTabletDir],
  templateUrl: './card-version-row.html',
  styleUrl: './card-version-row.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VersionRow extends UseCardVersioningDir {}
