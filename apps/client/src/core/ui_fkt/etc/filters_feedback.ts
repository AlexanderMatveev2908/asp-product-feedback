import { WithIdT } from '@/common/types/etc';
import { RootUiFkt } from '../root';

export type FilterFeedbackT = WithIdT<{
  val: string;
  label: string;
}>;

export class FiltersFeedbackUiFkt extends RootUiFkt {
  private static readonly _filters: Omit<FilterFeedbackT, 'id'>[] = [
    {
      val: 'all',
      label: 'All',
    },
    {
      val: 'ui',
      label: 'UI',
    },
    {
      val: 'ux',
      label: 'UX',
    },
    {
      val: 'enhancement',
      label: 'Enhancement',
    },
    {
      val: 'bug',
      label: 'Bug',
    },
    {
      val: 'feature',
      label: 'Feature',
    },
  ];

  public static filters(): FilterFeedbackT[] {
    return this.listWithIDs(this._filters);
  }
}
