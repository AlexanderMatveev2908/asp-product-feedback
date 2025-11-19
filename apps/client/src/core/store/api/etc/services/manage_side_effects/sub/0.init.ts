import { inject, Injectable } from '@angular/core';
import { UseApiConfSvc } from '../../use_api_conf';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';

@Injectable()
export abstract class _UseSideEffectsMngInitHk extends UseInjCtxHk {
  protected readonly confApi: UseApiConfSvc = inject(UseApiConfSvc);
  protected readonly DEF_CLIENT_ERR_MSG: string =
    'A wild Snorlax fall asleep blocking the road 💤. Try later';
}
