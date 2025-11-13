import { PairValLabelT } from '@/common/types/forms';
import { RootUiFkt } from '../root';

export interface FilterRoadmapT extends PairValLabelT {
  twdClr: string;
}

export class FiltersUiFkt extends RootUiFkt {
  private static readonly _filtersFeedback: Omit<PairValLabelT, 'id'>[] = [
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

  public static filtersFeedback(): PairValLabelT[] {
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
