import { PairValLabelTypedT } from '@/common/types/forms';
import { ProductCatT, ProductStatusT } from './types';
import { RootUiFkt } from '@/core/ui_fkt/root';

export class ProductsUiFkt extends RootUiFkt {
  private static readonly _categories: Omit<PairValLabelTypedT<ProductCatT>, 'id'>[] = [
    {
      label: 'UI',
      val: 'ui',
    },
    {
      label: 'UX',
      val: 'ux',
    },
    {
      label: 'Feature',
      val: 'feature',
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
}
