import { Nullable } from '@/common/types/etc';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-category-span',
  imports: [],
  templateUrl: './category-span.html',
  styleUrl: './category-span.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategorySpan {
  public readonly catLabel: InputSignal<Nullable<string>> = input.required();
}
