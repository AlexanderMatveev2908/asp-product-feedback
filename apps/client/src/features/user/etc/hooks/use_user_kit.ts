import { inject, Injectable } from '@angular/core';
import { UserSlice } from '../../slice';
import { UserApiSvc } from '../../api';

@Injectable({
  providedIn: 'root',
})
export class UseUserKitSvc {
  public readonly slice: UserSlice = inject(UserSlice);
  public readonly api: UserApiSvc = inject(UserApiSvc);
}
