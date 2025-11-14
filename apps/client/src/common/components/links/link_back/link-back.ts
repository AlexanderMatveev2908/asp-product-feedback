import { SvgT } from '@/common/types/etc';
import { NgComponentOutlet, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SvgStrokeIconArrowLeft } from '../../svgs/stroke/icon-arrow-left/icon-arrow-left';
import { LinkBackVersionT } from './etc/types';

@Component({
  selector: 'app-link-back',
  imports: [RouterLink, NgComponentOutlet, NgClass],
  templateUrl: './link-back.html',
  styleUrl: './link-back.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkBack {
  public readonly version: InputSignal<LinkBackVersionT> = input.required();
  public readonly Chevron: SvgT = SvgStrokeIconArrowLeft;
}
