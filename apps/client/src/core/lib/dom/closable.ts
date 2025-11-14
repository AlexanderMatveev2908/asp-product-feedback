import { ElDomT, RefDomT } from '@/common/types/dom';
import { Signal } from '@angular/core';

export interface OnMouseOutArgsT {
  elRef: RefDomT;
  e: Event;
  isOpen: Signal<boolean>;
  cb: () => void;
}

export class ClosableDom {
  public static onMouseOut(args: OnMouseOutArgsT): void {
    const drop: ElDomT = args.elRef?.nativeElement;
    const target: Node = args.e.target as Node;

    if (!drop || !target) return;

    if (args.isOpen() && !drop.contains(target)) args.cb();
  }
}
