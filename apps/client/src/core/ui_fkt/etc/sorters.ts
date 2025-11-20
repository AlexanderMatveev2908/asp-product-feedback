import { PairValLabelT } from '@/common/types/forms';
import { RootUiFkt } from '../root';
import { WithoutId } from '@/common/types/etc';

export type ValSortT = 'ASC' | 'DESC';

export interface SorterT extends Omit<PairValLabelT, 'val'> {
  field: string;
  val: ValSortT;
}

export class SortersUiFkt extends RootUiFkt {
  private static readonly _sorters: WithoutId<SorterT>[] = [
    {
      field: 'upvotes',
      label: 'Most Upvotes',
      val: 'ASC',
    },
    {
      field: 'upvotes',
      label: 'Least Upvotes',
      val: 'DESC',
    },
    {
      field: 'comments',
      label: 'Most Comments',
      val: 'ASC',
    },
    {
      field: 'comments',
      label: 'Least Comments',
      val: 'DESC',
    },
  ];

  public static sorters(): SorterT[] {
    return this.listWithIDs(this._sorters);
  }
}
