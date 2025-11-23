import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BtnVotes } from '@/common/components/btns/btn_votes/btn-votes';
import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { UseCardVersioningDir } from '../directives/use_card_versioning';
import { UseTabletDir } from '@/core/services/use_tablet';

@Component({
  selector: 'app-card-version-col',
  imports: [BtnVotes, RouterLink, NgTemplateOutlet, NgComponentOutlet, UseTabletDir],
  templateUrl: './card-version-col.html',
  styleUrl: './card-version-col.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VersionCol extends UseCardVersioningDir {}
