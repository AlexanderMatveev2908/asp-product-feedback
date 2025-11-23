import {
  computed,
  Directive,
  HostListener,
  input,
  InputSignal,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { BreakCSS } from '../constants/breakpoints';

@Directive({
  selector: '[appUseTabletDir]',
})
export class UseTabletDir implements OnInit {
  public readonly isTablet: WritableSignal<boolean> = signal(false);
  public readonly adoptTabletShape: InputSignal<boolean> = input.required();

  private updateRowState(): void {
    if (!this.adoptTabletShape()) return;
    this.isTablet.set(BreakCSS.isTablet());
  }

  public readonly isTabletVersion: Signal<boolean> = computed(
    () => this.isTablet() && this.adoptTabletShape()
  );

  ngOnInit(): void {
    this.updateRowState();
  }

  @HostListener('window:resize')
  public onResize(): void {
    this.updateRowState();
  }
}
