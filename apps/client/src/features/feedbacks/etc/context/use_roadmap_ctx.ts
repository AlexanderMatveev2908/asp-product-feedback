import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { FeedbacksSlice } from '../../slice';
import { FeedbackStatusT, FeedbackT } from '../types';
import { Nullable } from '@/common/types/etc';
import { FeedLibShape, FilterRoadmapT } from '../lib_shape';

@Injectable({
  providedIn: 'root',
})
export class UseRoadmapCtx {
  private readonly feedbacksSlice: FeedbacksSlice = inject(FeedbacksSlice);

  // ? local state
  public readonly currStatus: WritableSignal<FeedbackStatusT> = signal(FeedbackStatusT.IN_PROGRESS);

  // ? listeners
  public onStatusChange(v: FeedbackStatusT): void {
    this.currStatus.set(v);
  }

  // ? derived
  public readonly filteredFeedbacks: Signal<FeedbackT[]> = computed(() => {
    const data: Nullable<FeedbackT[]> = this.feedbacksSlice.feedbacks();
    if (!data) return [];

    return data.filter((f: FeedbackT) => f.status === this.currStatus());
  });

  public readonly statusesWithCount: Signal<(FilterRoadmapT & { count: number })[]> = computed(() =>
    FeedLibShape.statusesAsFilters().map((s: FilterRoadmapT) => ({
      ...s,
      count: this.countOf(s.val),
    }))
  );

  // ? helpers
  public countOf(v: FeedbackStatusT): number {
    const data: Nullable<FeedbackT[]> = this.feedbacksSlice.feedbacks();
    if (!data) return 0;

    return data.filter((f: FeedbackT) => f.status === v).length;
  }
}
