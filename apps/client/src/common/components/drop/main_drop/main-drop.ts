import { SortValT, SvgT } from '@/common/types/etc';
import { NgClass, NgComponentOutlet } from '@angular/common';
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
import { SvgStrokeIconArrowDown } from '../../svgs/stroke/icon-arrow-down/icon-arrow-down';
import { SortersUiFkt, SorterT } from '@/core/ui_fkt/etc/sorters';
import { SvgStrokeIconCheck } from '../../svgs/stroke/icon-check/icon-check';
import { UseDropHk } from '@/core/hooks/use_drop';
import { ElDomT, RefDomT } from '@/common/types/dom';
import { UseSearchFeedbacksCtx } from '@/features/feedbacks/etc/context/use_search_feedbacks_ctx';
import { KeySortT } from '@/features/feedbacks/etc/forms/search_feedbacks/form_mng';

@Component({
  selector: 'app-main-drop',
  imports: [NgComponentOutlet, NgClass],
  templateUrl: './main-drop.html',
  styleUrl: './main-drop.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseDropHk],
})
export class MainDrop implements OnInit {
  // ? svc
  public readonly useDrop: UseDropHk = inject(UseDropHk);

  private readonly useSearchCtx: UseSearchFeedbacksCtx = inject(UseSearchFeedbacksCtx);

  // ? static
  public readonly Chevron: SvgT = SvgStrokeIconArrowDown;
  public readonly Check: SvgT = SvgStrokeIconCheck;

  public readonly options: SorterT[] = SortersUiFkt.sorters();

  // ? listeners
  public onClick(): void {
    this.useDrop.isOpen.set(!this.useDrop.isOpen());
  }

  public onSortChange(key: KeySortT, v: SortValT): void {
    this.useSearchCtx.onSortChange(key, v);
    this.useDrop.isOpen.set(false);
  }

  public isChosen(key: KeySortT, val: SortValT): boolean {
    return this.useSearchCtx.isSortChosen(key, val);
  }

  @ViewChild('dropRef')
  private readonly dropRef: RefDomT;

  // ? derived
  public readonly twd: Signal<string> = computed(() =>
    this.useDrop.isOpen()
      ? 'translate-y-0 pointer-events-auto'
      : '-translate-y-[50px] pointer-events-none'
  );

  public readonly currLabel: Signal<string> = computed(() =>
    SortersUiFkt.labelByExistingSortVals(this.useSearchCtx.formData?.())
  );

  ngOnInit(): void {
    this.useSearchCtx.setupForm();
  }

  @HostListener('document:mousedown', ['$event'])
  public onMouseDown(e: Event): void {
    const drop: ElDomT = this.dropRef?.nativeElement;
    const target: Node = e.target as Node;

    if (!drop || !target) return;

    if (this.useDrop.isOpen() && !drop.contains(target)) this.useDrop.isOpen.set(false);
  }
}
