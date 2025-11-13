import { SvgFillIconHamburger } from '@/common/components/svgs/fill/icon-hamburger/icon-hamburger';
import { SvgT } from '@/common/types/etc';
import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, Signal } from '@angular/core';

@Component({
  selector: 'app-navbar-home-mobile',
  imports: [NgComponentOutlet],
  templateUrl: './navbar-home-mobile.html',
  styleUrl: './navbar-home-mobile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarHomeMobile {
  public readonly CurrSVG: Signal<SvgT> = computed(() => SvgFillIconHamburger);
}
