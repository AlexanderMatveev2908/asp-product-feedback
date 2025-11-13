import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WakeUp } from '@/layout/wake_up/wake-up';
import { Toast } from '@/layout/toast/toast';
import { NavbarHomeMobile } from '@/layout/navbar_home_mobile/navbar-home-mobile';
import { SidebarMobile } from '@/layout/sidebar_mobile/sidebar-mobile';
import { ProductsSlice } from '@/features/products/slice';
import { mockData } from '@/assets/data';
import { ProductT } from '@/features/products/etc/types';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WakeUp, Toast, NavbarHomeMobile, SidebarMobile],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  private readonly productsSlice: ProductsSlice = inject(ProductsSlice);

  ngOnInit(): void {
    const fakeLoading: number = 1500;

    setTimeout(() => {
      this.productsSlice.setProducts(mockData.productRequests as unknown as ProductT[]);
    }, fakeLoading);
  }
}
