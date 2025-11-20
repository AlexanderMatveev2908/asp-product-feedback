import { PairValLabelTypedT } from '@/common/types/forms';
import { FeedbackCatT, FeedbackStatusT } from './types';
import { RootUiFkt } from '@/core/ui_fkt/root';
import { Nullable, WithoutId } from '@/common/types/etc';

export class FeedLibShape extends RootUiFkt {
  private static readonly _categories: WithoutId<PairValLabelTypedT<FeedbackCatT>>[] = [
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
  public static categoriesPlusAll(): PairValLabelTypedT<FeedbackCatT | string>[] {
    return [this.withID({ label: 'All', val: 'ALL' }), ...this.categories()];
  }

  public static catLabelByVal(arg: string): Nullable<string> {
    return (
      this._categories.find((el: WithoutId<PairValLabelTypedT<FeedbackCatT>>) => el.val === arg)
        ?.label ?? null
    );
  }

  public static defCat(): FeedbackCatT {
    return this._categories[0].val;
  }

  public static includedByCategories(arg: string): boolean {
    return this._categories.some(
      (pair: WithoutId<PairValLabelTypedT<FeedbackCatT>>) => pair.val === arg
    );
  }

  private static readonly _statuses: WithoutId<FilterRoadmapT>[] = [
    {
      label: 'Suggestion',
      val: FeedbackStatusT.SUGGESTION,
      twdClr: '',
    },
    {
      label: 'Planned',
      val: FeedbackStatusT.PLANNED,
      twdClr: 'bg-orange__prm',
    },
    {
      label: 'In-Progress',
      val: FeedbackStatusT.IN_PROGRESS,
      twdClr: 'bg-purple__prm',
    },
    {
      label: 'Live',
      val: FeedbackStatusT.LIVE,
      twdClr: 'bg-blue__light__0',
    },
  ];

  public static statuses(): FilterRoadmapT[] {
    return this.listWithIDs(this._statuses);
  }
  public static statusesFilter(): FilterRoadmapT[] {
    return this.statuses().filter(
      (v: PairValLabelTypedT<FeedbackStatusT>) => v.val !== FeedbackStatusT.SUGGESTION
    );
  }

  public static statusLabelByVal(arg: string): Nullable<string> {
    return (
      this._statuses.find((el: WithoutId<PairValLabelTypedT<FeedbackStatusT>>) => el.val === arg)
        ?.label ?? null
    );
  }
}

export type FilterRoadmapT = PairValLabelTypedT<FeedbackStatusT> & { twdClr: string };
