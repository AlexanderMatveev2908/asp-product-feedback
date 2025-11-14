import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable()
export class UseDropHk {
  public readonly isOpen: WritableSignal<boolean> = signal(false);

  public readonly toggle: () => void = () => this.isOpen.set(!this.isOpen());
}
