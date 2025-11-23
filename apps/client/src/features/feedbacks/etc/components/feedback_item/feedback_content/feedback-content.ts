import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  input,
  InputSignal,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { FeedbackT } from '../../../types';
import { BreakCSS } from '@/core/constants/breakpoints';
import { VersionCol } from './version_col/version-col';

@Component({
  selector: 'app-feedback-content',
  imports: [VersionCol],
  templateUrl: './feedback-content.html',
  styleUrl: './feedback-content.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackContent implements OnInit {
  public readonly item: InputSignal<FeedbackT> = input.required();
  public readonly rowRenderTablet: InputSignal<boolean> = input.required();

  public readonly isTablet: WritableSignal<boolean> = signal(false);

  private updateRowState(): void {
    if (!this.rowRenderTablet()) return;
    this.isTablet.set(BreakCSS.isTablet());
  }

  ngOnInit(): void {
    this.updateRowState();
  }

  @HostListener('window:resize')
  public onResize(): void {
    this.updateRowState();
  }
}
