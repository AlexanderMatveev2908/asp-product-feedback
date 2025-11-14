import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WakeUp } from '@/layout/wake_up/wake-up';
import { Toast } from '@/layout/toast/toast';
import { ProductsSlice } from '@/features/products/slice';
import { mockData } from '@/assets/data';
import { ProductT } from '@/features/products/etc/types';
import { UseScrollSvc } from '@/core/services/use_scroll';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WakeUp, Toast],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  private readonly productsSlice: ProductsSlice = inject(ProductsSlice);
  private readonly useScroll: UseScrollSvc = inject(UseScrollSvc);

  ngOnInit(): void {
    this.useScroll.main();
    const fakeLoading: number = 1000;
    setTimeout(() => {
      this.productsSlice.setProducts(mockData.productRequests as unknown as ProductT[]);
    }, fakeLoading);
  }
}
