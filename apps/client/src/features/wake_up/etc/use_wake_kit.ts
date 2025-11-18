import { inject, Injectable } from '@angular/core';
import { WakeUpSlice } from '../slice';
import { WakeUpApiSvc } from '../api';

@Injectable({
  providedIn: 'root',
})
export class UseWakeKit {
  public readonly slice: WakeUpSlice = inject(WakeUpSlice);
  public readonly api: WakeUpApiSvc = inject(WakeUpApiSvc);
}
