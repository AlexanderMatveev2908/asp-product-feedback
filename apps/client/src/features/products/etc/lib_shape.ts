import { PairValLabelTypedT } from '@/common/types/forms';
import { ProductCatT, ProductStatusT } from './types';
import { RootUiFkt } from '@/core/ui_fkt/root';

export class ProductsLibShape extends RootUiFkt {
  private static readonly _categories: Omit<PairValLabelTypedT<ProductCatT>, 'id'>[] = [
    {
      label: 'Feature',
      val: 'feature',
    },
    {
      label: 'UI',
      val: 'ui',
    },
    {
      label: 'UX',
      val: 'ux',
    },
    {
      label: 'Enhancement',
      val: 'enhancement',
    },
    {
      label: 'Bug',
      val: 'bug',
    },
  ];

  public static categories(): PairValLabelTypedT<ProductCatT>[] {
    return this.listWithIDs(this._categories);
  }

  public static defCat(): ProductCatT {
    return this._categories[0].val;
  }

  public static includedByCategories(arg: string): boolean {
    return this._categories.some(
      (pair: Omit<PairValLabelTypedT<ProductCatT>, 'id'>) => pair.val === arg
    );
  }

  private static readonly _statuses: Omit<PairValLabelTypedT<ProductStatusT>, 'id'>[] = [
    {
      label: 'Suggestion',
      val: 'suggestion',
    },
    {
      label: 'Planned',
      val: 'planned',
    },
    {
      label: 'In-Progress',
      val: 'in_progress',
    },
    {
      label: 'Live',
      val: 'live',
    },
  ];

  public static statuses(): PairValLabelTypedT<ProductStatusT>[] {
    return this.listWithIDs(this._statuses);
  }
  public static statusesFilter(): PairValLabelTypedT<ProductStatusT>[] {
    return this.statuses().filter(
      (v: PairValLabelTypedT<ProductStatusT>) => v.val !== 'suggestion'
    );
  }
}
