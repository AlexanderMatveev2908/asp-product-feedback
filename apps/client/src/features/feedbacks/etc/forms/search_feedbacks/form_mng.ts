import { RootFormMng } from '@/core/paperwork/root_form_mng/root_form_mng';
import { FormControl, FormGroup } from '@angular/forms';
import z, { ZodArray, ZodObject, ZodString } from 'zod';

export type KeySortT = 'upvotesSort' | 'commentsSort';

export class SearchFeedbacksFormMng extends RootFormMng {
  public static readonly schema: ZodObject<{
    category: ZodArray<ZodString>;
    upvotesSort: ZodString;
    commentsSort: ZodString;
  }> = z.object({
    category: z.array(z.string()),
    upvotesSort: z.string(),
    commentsSort: z.string(),
  });

  public static readonly form: FormGroup = new FormGroup({
    category: new FormControl(['ALL']),
    upvotesSort: new FormControl(''),
    commentsSort: new FormControl(''),
  });
}

export type SearchFeedbacksFormT = z.infer<typeof SearchFeedbacksFormMng.schema>;
