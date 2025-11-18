import { UseApiSvc } from '@/core/store/api/use_api';
import { ResApiT } from '@/core/store/api/etc/types';
import { LibApiArgs } from '@/core/store/api/etc/lib/api_args';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserApiSvc {
  private readonly api: UseApiSvc = inject(UseApiSvc);
}
