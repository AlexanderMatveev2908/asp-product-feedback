import { SvgT } from '@/common/types/etc';
import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SvgStrokeIconArrowLeft } from '../../svgs/stroke/icon-arrow-left/icon-arrow-left';

@Component({
  selector: 'app-link-back',
  imports: [RouterLink, NgComponentOutlet],
  templateUrl: './link-back.html',
  styleUrl: './link-back.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkBack {
  public readonly Chevron: SvgT = SvgStrokeIconArrowLeft;
}
