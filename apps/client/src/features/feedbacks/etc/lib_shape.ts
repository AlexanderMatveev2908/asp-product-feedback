import { PairValLabelTypedT } from '@/common/types/forms';
import { FeedbackCatT, FeedbackStatusT } from './types';
import { RootUiFkt } from '@/core/ui_fkt/root';
import { Nullable, OrNone, WithoutId } from '@/common/types/etc';
import { ErrApp } from '@/core/lib/etc/err';

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
      comment: '',
    },
    {
      label: 'Planned',
      val: FeedbackStatusT.PLANNED,
      twdClr: 'var(--orange__prm)',
      comment: 'Ideas prioritized for research',
    },
    {
      label: 'In-Progress',
      val: FeedbackStatusT.IN_PROGRESS,
      twdClr: 'var(--purple__prm)',
      comment: 'Currently being developed',
    },
    {
      label: 'Live',
      val: FeedbackStatusT.LIVE,
      twdClr: 'var(--blue__light__0)',
      comment: 'Released features',
    },
  ];

  public static clrByStatus(v: FeedbackStatusT): string {
    const found: OrNone<string> = this._statuses.find(
      (el: WithoutId<FilterRoadmapT>) => el.val === v
    )?.twdClr;

    if (!found) throw new ErrApp('404 • status not found, passed invalid argument');

    return found;
  }

  public static includedByStatus(arg: string): boolean {
    return this._statuses.some((pair: WithoutId<FilterRoadmapT>) => pair.val === arg);
  }

  public static statuses(): FilterRoadmapT[] {
    return this.listWithIDs(this._statuses);
  }
  public static statusesAsFilters(): FilterRoadmapT[] {
    return this.statuses().filter(
      (v: PairValLabelTypedT<FeedbackStatusT>) => v.val !== FeedbackStatusT.SUGGESTION
    );
  }

  public static statusLabelByVal(arg: string): string {
    return (
      this._statuses.find((el: WithoutId<PairValLabelTypedT<FeedbackStatusT>>) => el.val === arg)
        ?.label ?? ''
    );
  }

  public static descriptionStatusByVal(v: FeedbackStatusT): string {
    return this._statuses.find((f: WithoutId<FilterRoadmapT>) => f.val === v)?.comment ?? '';
  }
}

export type FilterRoadmapT = PairValLabelTypedT<FeedbackStatusT> & {
  twdClr: string;
  comment: string;
};
