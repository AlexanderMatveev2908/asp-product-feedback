import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  inject,
  Signal,
  ViewChild,
} from '@angular/core';
import { BlackBg } from '../black_bg/black-bg';
import { SidebarMobileSlice } from '@/features/sidebar_mobile/slice';
import { NgClass } from '@angular/common';
import { FilterRoadmapT, FiltersUiFkt } from '@/core/ui_fkt/etc/filters';
import { PairValLabelT } from '@/common/types/forms';
import { ElDomT, RefDomT } from '@/common/types/dom';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar-mobile',
  imports: [BlackBg, NgClass, RouterLink],
  templateUrl: './sidebar-mobile.html',
  styleUrl: './sidebar-mobile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMobile {
  private readonly sideSlice: SidebarMobileSlice = inject(SidebarMobileSlice);

  @ViewChild('sideRef')
  private readonly sideRef: RefDomT;

  // ? derived
  public readonly blackBgCSS: Signal<string> = computed(
    () => `z__sidebar__bg ${this.sideSlice.isOpen() ? 'fixed' : 'hidden'}`
  );
  public readonly twd: Signal<string> = computed(() =>
    this.sideSlice.isOpen() ? '-translate-x-full' : '-translate-x-0'
  );

  // ? listeners
  public readonly closeOnNav: () => void = () => this.sideSlice.setIsOpen(false);

  // ? static
  public readonly filtersFeedback: PairValLabelT[] = FiltersUiFkt.filtersFeedback();
  public readonly filtersRoadmap: FilterRoadmapT[] = FiltersUiFkt.filtersRoadmap();

  @HostListener('document:mousedown', ['$event'])
  public onMouseDown(e: Event): void {
    const side: ElDomT = this.sideRef?.nativeElement;
    const target: Node = e.target as Node;

    if (!side || !target) return;

    if (this.sideSlice.isOpen() && !side.contains(target)) this.sideSlice.setIsOpen(false);
  }
}
