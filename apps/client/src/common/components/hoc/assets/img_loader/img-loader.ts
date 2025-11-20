import { LibMetaEvent, MetaEventT } from '@/core/lib/css/events';
import { NgClass, NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';

@Component({
  selector: 'app-img-loader',
  imports: [NgClass, NgComponentOutlet],
  templateUrl: './img-loader.html',
  styleUrl: './img-loader.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImgLoader {
  public readonly size: InputSignal<string> = input.required();
  public readonly src: InputSignal<string> = input.required();
  public readonly radius: InputSignal<string> = input.required();

  public readonly isPending: WritableSignal<boolean> = signal(true);
  public readonly isError: WritableSignal<boolean> = signal(false);

  public onLoaded(): void {
    this.isPending.set(false);
  }

  public onError(): void {
    this.isError.set(true);
  }

  public readonly metaError: MetaEventT = LibMetaEvent.metaByT('ERR');

  public readonly twdImg: Signal<string> = computed(() =>
    this.isPending() || this.isError() ? 'absolute opacity-0' : 'block opacity-1'
  );
}
