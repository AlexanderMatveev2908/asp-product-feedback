import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WakeUp } from '@/layout/wake_up/wake-up';
import { Toast } from '@/layout/toast/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WakeUp, Toast],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
