import { SvgT } from '@/common/types/etc';
import { NgClass, NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { SvgStrokeIconArrowDown } from '../../svgs/stroke/icon-arrow-down/icon-arrow-down';
import { SortersUiFkt, SorterT } from '@/core/ui_fkt/etc/sorters';
import { SvgStrokeIconCheck } from '../../svgs/stroke/icon-check/icon-check';
import { UseDropHk } from '@/core/hooks/use_drop';

@Component({
  selector: 'app-main-drop',
  imports: [NgComponentOutlet, NgClass],
  templateUrl: './main-drop.html',
  styleUrl: './main-drop.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseDropHk],
})
export class MainDrop {
  // ? svc
  public readonly useDrop: UseDropHk = inject(UseDropHk);

  // ? static
  public readonly Chevron: SvgT = SvgStrokeIconArrowDown;
  public readonly Check: SvgT = SvgStrokeIconCheck;

  public readonly options: SorterT[] = SortersUiFkt.sorters();

  public onClick(): void {
    this.useDrop.isOpen.set(!this.useDrop.isOpen());
  }

  public readonly twd: Signal<string> = computed(() =>
    this.useDrop.isOpen()
      ? 'translate-y-0 opacity-1 pointer-events-auto'
      : '-translate-y-[50px] opacity-0 pointer-events-none'
  );
}
