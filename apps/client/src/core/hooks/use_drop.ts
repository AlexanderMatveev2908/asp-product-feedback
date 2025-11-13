import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable()
export class UseDropHk {
  public readonly isOpen: WritableSignal<boolean> = signal(false);
}
