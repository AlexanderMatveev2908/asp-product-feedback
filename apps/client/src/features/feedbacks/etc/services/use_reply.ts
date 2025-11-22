import { inject, Injectable } from '@angular/core';
import { UseFeedKit } from './use_feed_kit';
import { from, Observable } from 'rxjs';
import { ContentFormT } from '@/core/paperwork/etc/content_form_mng';

@Injectable({
  providedIn: 'root',
})
export class UseReplySvc {
  private readonly useFeedKit: UseFeedKit = inject(UseFeedKit);

  public readonly main: (data: ContentFormT) => Observable<unknown> = (data: ContentFormT) => {
    console.log(data);
    return from([1, 2, 3]);
  };
}
