import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable()
export class UseToggleReplyHk {
  public readonly showReply: WritableSignal<boolean> = signal(false);

  public readonly toggle: () => void = () => {
    this.showReply.set(!this.showReply());
  };

  public readonly hide: () => void = () => {
    this.showReply.set(false);
  };
}
