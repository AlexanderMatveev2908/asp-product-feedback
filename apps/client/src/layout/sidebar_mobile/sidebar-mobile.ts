import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { BlackBg } from '../black_bg/black-bg';
import { SidebarMobileSlice } from '@/features/sidebar_mobile/slice';
import { NgClass } from '@angular/common';
import { FilterFeedbackT, FiltersFeedbackUiFkt } from '@/core/ui_fkt/etc/filters_feedback';

@Component({
  selector: 'app-sidebar-mobile',
  imports: [BlackBg, NgClass],
  templateUrl: './sidebar-mobile.html',
  styleUrl: './sidebar-mobile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMobile {
  private readonly sideSlice: SidebarMobileSlice = inject(SidebarMobileSlice);

  // ? derived
  public readonly blackBgCSS: Signal<string> = computed(
    () => `z__sidebar__bg ${this.sideSlice.isOpen() ? 'fixed' : 'hidden'}`
  );
  public readonly twd: Signal<string> = computed(() =>
    this.sideSlice.isOpen() ? '-translate-x-full' : '-translate-x-0'
  );

  // ? static
  public readonly filtersFeedback: FilterFeedbackT[] = FiltersFeedbackUiFkt.filters();
}
