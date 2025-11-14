import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-products-post',
  imports: [],
  templateUrl: './products-post.html',
  styleUrl: './products-post.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsPost {}
