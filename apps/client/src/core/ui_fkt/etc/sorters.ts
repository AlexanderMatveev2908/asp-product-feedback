import { PairValLabelT } from '@/common/types/forms';
import { RootUiFkt } from '../root';
import { OrNone, SortValT, WithoutId } from '@/common/types/etc';
import {
  KeySortT,
  SearchFeedbacksFormT,
} from '@/features/feedbacks/etc/forms/search_feedbacks/form_mng';

export interface SorterT extends Omit<PairValLabelT, 'val'> {
  field: KeySortT;
  val: SortValT;
}

export class SortersUiFkt extends RootUiFkt {
  private static readonly _sorters: WithoutId<SorterT>[] = [
    {
      field: 'upvotesSort',
      label: 'Most Upvotes',
      val: SortValT.DESC,
    },
    {
      field: 'upvotesSort',
      label: 'Least Upvotes',
      val: SortValT.ASC,
    },
    {
      field: 'commentsSort',
      label: 'Most Comments',
      val: SortValT.DESC,
    },
    {
      field: 'commentsSort',
      label: 'Least Comments',
      val: SortValT.ASC,
    },
  ];

  public static sorters(): SorterT[] {
    return this.listWithIDs(this._sorters);
  }

  public static labelByExistingSortVals(data: OrNone<SearchFeedbacksFormT>): string {
    const defMsg: string = 'Chose an option';
    if (!data) return defMsg;

    const pairs: Record<KeySortT, string> = {
      upvotesSort: data.upvotesSort,
      commentsSort: data.commentsSort,
    };

    for (const key in pairs) {
      const val: string = pairs[key as keyof typeof pairs];

      if (val)
        return this._sorters.find((s: WithoutId<SorterT>) => s.field === key && s.val === val)!
          .label;
    }

    return defMsg;
  }
}
