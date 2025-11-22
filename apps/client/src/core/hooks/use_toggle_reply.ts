import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable()
export class UseToggleReplyHk {
  public readonly showReply: WritableSignal<boolean> = signal(false);

  public readonly toggle: () => void = () => {
    console.log('run');
    this.showReply.set(!this.showReply());
  };
}
