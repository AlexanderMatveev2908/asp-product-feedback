import { ObsResT } from '@/core/store/api/etc/types';
import { UseApiSvc } from '@/core/store/api/use_api';
import { inject, Injectable } from '@angular/core';
import { LibApiArgs } from '@/core/store/api/etc/lib/api_args';
import { UserT } from './etc/types';

@Injectable({
  providedIn: 'root',
})
export class UserApiSvc {
  private readonly base: string = '/user';
  private readonly api: UseApiSvc = inject(UseApiSvc);

  public getRandomUser(): ObsResT<{ user: UserT }> {
    return this.api.get(
      LibApiArgs.withURL(`${this.base}/random`)
        .toastOnFulfilled()
        .toastOkMsg('anonymous user generated')
    );
  }
}
