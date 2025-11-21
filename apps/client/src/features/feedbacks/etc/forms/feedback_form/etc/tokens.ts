import { UseApiTrackerHk } from '@/core/store/api/etc/hooks/use_tracker';
import { InjectionToken } from '@angular/core';

export class FeedbackFormTokens {
  public static readonly FORM_TRACKER: InjectionToken<UseApiTrackerHk> =
    new InjectionToken<UseApiTrackerHk>('FORM_TRACKER');

  public static readonly DEL_TRACKER: InjectionToken<UseApiTrackerHk> =
    new InjectionToken<UseApiTrackerHk>('DEL_TRACKER');
}
