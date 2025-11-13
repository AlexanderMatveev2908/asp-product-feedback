import { WithIdT } from '@/common/types/etc';
import { RootUiFkt } from '../root';

export type FilterFeedbackT = WithIdT<{
  val: string;
  label: string;
}>;

export interface FilterRoadmapT extends FilterFeedbackT {
  twdClr: string;
}

export class FiltersUiFkt extends RootUiFkt {
  private static readonly _filtersFeedback: Omit<FilterFeedbackT, 'id'>[] = [
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

  public static filtersFeedback(): FilterFeedbackT[] {
    return this.listWithIDs(this._filtersFeedback);
  }

  private static readonly _filtersRoadmap: Omit<FilterRoadmapT, 'id'>[] = [
    {
      val: 'planned',
      label: 'Planned',
      twdClr: 'bg-orange__prm',
    },
    {
      val: 'in_progress',
      label: 'In-Progress',
      twdClr: 'bg-purple__prm',
    },
    {
      val: 'live',
      label: 'Live',
      twdClr: 'bg-blue__light__0',
    },
  ];

  public static filtersRoadmap(): FilterRoadmapT[] {
    return this.listWithIDs(this._filtersRoadmap);
  }
}
