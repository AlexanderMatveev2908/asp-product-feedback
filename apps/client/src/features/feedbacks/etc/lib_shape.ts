import { PairValLabelTypedT } from '@/common/types/forms';
import { FeedbackCatT, FeedbackStatusT } from './types';
import { RootUiFkt } from '@/core/ui_fkt/root';
import { Nullable } from '@/common/types/etc';

export class ProductsLibShape extends RootUiFkt {
  private static readonly _categories: Omit<PairValLabelTypedT<FeedbackCatT>, 'id'>[] = [
    {
      label: 'Feature',
      val: FeedbackCatT.FEATURE,
    },
    {
      label: 'UI',
      val: FeedbackCatT.UI,
    },
    {
      label: 'UX',
      val: FeedbackCatT.UX,
    },
    {
      label: 'Enhancement',
      val: FeedbackCatT.ENHANCEMENT,
    },
    {
      label: 'Bug',
      val: FeedbackCatT.BUG,
    },
  ];

  public static categories(): PairValLabelTypedT<FeedbackCatT>[] {
    return this.listWithIDs(this._categories);
  }

  public static catLabelByVal(arg: string): Nullable<string> {
    return (
      this._categories.find((el: Omit<PairValLabelTypedT<FeedbackCatT>, 'id'>) => el.val === arg)
        ?.label ?? null
    );
  }

  public static defCat(): FeedbackCatT {
    return this._categories[0].val;
  }

  public static includedByCategories(arg: string): boolean {
    return this._categories.some(
      (pair: Omit<PairValLabelTypedT<FeedbackCatT>, 'id'>) => pair.val === arg
    );
  }

  private static readonly _statuses: Omit<PairValLabelTypedT<FeedbackStatusT>, 'id'>[] = [
    {
      label: 'Suggestion',
      val: FeedbackStatusT.SUGGESTION,
    },
    {
      label: 'Planned',
      val: FeedbackStatusT.PLANNED,
    },
    {
      label: 'In-Progress',
      val: FeedbackStatusT.IN_PROGRESS,
    },
    {
      label: 'Live',
      val: FeedbackStatusT.LIVE,
    },
  ];

  public static statuses(): PairValLabelTypedT<FeedbackStatusT>[] {
    return this.listWithIDs(this._statuses);
  }
  public static statusesFilter(): PairValLabelTypedT<FeedbackStatusT>[] {
    return this.statuses().filter(
      (v: PairValLabelTypedT<FeedbackStatusT>) => v.val !== FeedbackStatusT.SUGGESTION
    );
  }

  public static statusLabelByVal(arg: string): Nullable<string> {
    return (
      this._statuses.find((el: Omit<PairValLabelTypedT<FeedbackStatusT>, 'id'>) => el.val === arg)
        ?.label ?? null
    );
  }
}
