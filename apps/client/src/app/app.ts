import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WakeUp } from '@/layout/wake_up/wake-up';
import { Toast } from '@/layout/toast/toast';
import { NavbarHomeMobile } from '@/layout/navbar_home_mobile/navbar-home-mobile';
import { SidebarMobile } from '@/layout/sidebar_mobile/sidebar-mobile';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WakeUp, Toast, NavbarHomeMobile, SidebarMobile],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
