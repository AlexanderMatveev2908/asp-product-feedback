import { PairValLabelT } from '@/common/types/forms';
import { RootUiFkt } from '../root';
import { SortValT, WithoutId } from '@/common/types/etc';
import { KeySortT } from '@/features/feedbacks/etc/forms/search_feedbacks/form_mng';

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
}
