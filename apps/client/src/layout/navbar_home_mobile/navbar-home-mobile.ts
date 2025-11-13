import { SvgFillIconClose } from '@/common/components/svgs/fill/icon-close/icon-close';
import { SvgFillIconHamburger } from '@/common/components/svgs/fill/icon-hamburger/icon-hamburger';
import { SvgT } from '@/common/types/etc';
import { SidebarMobileSlice } from '@/features/sidebar_mobile/slice';
import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar-home-mobile',
  imports: [NgComponentOutlet, RouterLink],
  templateUrl: './navbar-home-mobile.html',
  styleUrl: './navbar-home-mobile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarHomeMobile {
  private readonly sideSlice: SidebarMobileSlice = inject(SidebarMobileSlice);

  public readonly CurrSVG: Signal<SvgT> = computed(() =>
    this.sideSlice.isOpen() ? SvgFillIconClose : SvgFillIconHamburger
  );

  public onClick(): void {
    this.sideSlice.setIsOpen(!this.sideSlice.isOpen());
  }
}
