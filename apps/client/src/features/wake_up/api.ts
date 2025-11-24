import { UseApiSvc } from '@/core/store/api/use_api';
import { ResApiT } from '@/core/store/api/etc/types';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { LibApiArgs } from '@/core/store/api/etc/lib/api_args';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class WakeUpApiSvc {
  private readonly api: UseApiSvc = inject(UseApiSvc);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  private wakeUp(): Observable<ResApiT<void>> {
    return this.api.get(LibApiArgs.withURL('/wake-up').noToast());
  }

  // eslint-disable-next-line no-magic-numbers
  private readonly MAX_CALLS: number = 30;

  public poll(): Observable<ResApiT<void>> {
    return this.wakeUp().pipe(
      retry({
        delay: 1000,
        count: this.MAX_CALLS,
        resetOnSuccess: false,
      }),
      takeUntilDestroyed(this.destroyRef)
    );
  }
}
