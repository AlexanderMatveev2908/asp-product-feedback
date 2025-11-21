import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-feedbacks-layout',
  imports: [RouterOutlet],
  templateUrl: './feedbacks-layout.html',
  styleUrl: './feedbacks-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbacksLayout {}
