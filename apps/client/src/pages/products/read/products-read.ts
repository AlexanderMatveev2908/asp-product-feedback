import { Nullable } from '@/common/types/etc';
import { UseNavSvc } from '@/core/services/use_nav/index';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Params } from '@angular/router';

@Component({
  selector: 'app-products-read',
  imports: [],
  templateUrl: './products-read.html',
  styleUrl: './products-read.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsRead implements OnInit {
  private readonly useNav: UseNavSvc = inject(UseNavSvc);

  ngOnInit(): void {
    const vars: Nullable<Params> = this.useNav.path_variables();
    console.log(vars);
  }
}
