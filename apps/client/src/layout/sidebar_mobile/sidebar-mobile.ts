import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  inject,
  OnInit,
  Signal,
  ViewChild,
} from '@angular/core';
import { BlackBg } from '../black_bg/black-bg';
import { SidebarMobileSlice } from '@/features/sidebar_mobile/slice';
import { NgClass } from '@angular/common';
import { PairValLabelT } from '@/common/types/forms';
import { ElDomT, RefDomT } from '@/common/types/dom';
import { RouterLink } from '@angular/router';
import { SearchFeedbacksCtx } from '@/features/feedbacks/etc/context/use_search_feedbacks_ctx';
import { FeedLibShape } from '@/features/feedbacks/etc/lib_shape';
import { UseRoadmapCtx } from '@/features/feedbacks/etc/context/use_roadmap_ctx';

@Component({
  selector: 'app-sidebar-mobile',
  imports: [BlackBg, NgClass, RouterLink],
  templateUrl: './sidebar-mobile.html',
  styleUrl: './sidebar-mobile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMobile implements OnInit {
  private readonly sideSlice: SidebarMobileSlice = inject(SidebarMobileSlice);
  private readonly searchCtx: SearchFeedbacksCtx = inject(SearchFeedbacksCtx);

  public readonly useRoadCtx: UseRoadmapCtx = inject(UseRoadmapCtx);

  @ViewChild('sideRef')
  private readonly sideRef: RefDomT;

  // ? derived
  public readonly blackBgCSS: Signal<string> = computed(
    () => `z__sidebar__bg ${this.sideSlice.isOpen() ? 'fixed' : 'hidden'}`
  );
  public readonly twd: Signal<string> = computed(() =>
    this.sideSlice.isOpen() ? '-translate-x-full' : '-translate-x-0'
  );

  public bgFilter(v: string): string {
    return this.searchCtx.isCatChosen(v) ? 'var(--blue__prm)' : 'var(--gray__0)';
  }
  public clrFilter(v: string): string {
    return this.searchCtx.isCatChosen(v) ? '#fff' : 'var(--blue__prm)';
  }

  // ? listeners
  public readonly closeOnNav: () => void = () => this.sideSlice.setIsOpen(false);
  public onCatChange(v: string): void {
    this.searchCtx.onCatChange(v);
  }

  // ? static
  public readonly filtersFeedback: PairValLabelT[] = FeedLibShape.categoriesPlusAll();

  ngOnInit(): void {
    this.searchCtx.setupForm();
  }

  @HostListener('document:mousedown', ['$event'])
  public onMouseDown(e: Event): void {
    const side: ElDomT = this.sideRef?.nativeElement;
    const target: Node = e.target as Node;

    if (!side || !target) return;

    if (this.sideSlice.isOpen() && !side.contains(target)) this.sideSlice.setIsOpen(false);
  }
}
