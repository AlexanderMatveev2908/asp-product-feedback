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
import { ElDomT, RefDomT } from '@/common/types/dom';
import { FeedbacksFilters } from '@/features/feedbacks/etc/components/feedbacks_filters/feedbacks-filters';
import { FeedbacksRoadmapCounter } from '@/features/feedbacks/etc/components/feedbacks_roadmap_counter/feedbacks-roadmap-counter';

@Component({
  selector: 'app-sidebar-mobile',
  imports: [BlackBg, NgClass, FeedbacksFilters, FeedbacksRoadmapCounter],
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
    () => `z-sidebar__bg ${this.sideSlice.isOpen() ? 'fixed' : 'hidden'}`
  );
  public readonly twd: Signal<string> = computed(() =>
    this.sideSlice.isOpen() ? '-translate-x-full' : '-translate-x-0'
  );

  // ? listeners
  public readonly closeOnNav: () => void = () => this.sideSlice.setIsOpen(false);

  @HostListener('document:mousedown', ['$event'])
  public onMouseDown(e: Event): void {
    const side: ElDomT = this.sideRef?.nativeElement;
    const target: Node = e.target as Node;

    if (!side || !target) return;

    if (this.sideSlice.isOpen() && !side.contains(target)) this.sideSlice.setIsOpen(false);
  }
}
