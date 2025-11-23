import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable()
export class UseFocusHk {
  public readonly isFocused: WritableSignal<boolean> = signal(false);

  public readonly onFocus: () => void = () => {
    this.isFocused.set(true);
  };
  public readonly onBlur: () => void = () => {
    this.isFocused.set(false);
  };
}
