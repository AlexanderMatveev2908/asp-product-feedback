import { RootFormMng } from '@/core/paperwork/root_form_mng/root_form_mng';
import { FormControl, FormGroup } from '@angular/forms';
import z, { ZodArray, ZodObject, ZodString } from 'zod';

export class SearchFeedbacksFormMng extends RootFormMng {
  public static readonly schema: ZodObject<{
    category: ZodArray<ZodString>;
  }> = z.object({
    category: z.array(z.string()),
    upvotes_sort: z.string(),
    comments_sort: z.string(),
  });

  public static readonly form: FormGroup = new FormGroup({
    category: new FormControl(['ALL']),
    upvotes_sort: new FormControl('DESC'),
    comments_sort: new FormControl('DESC'),
  });
}

export type SearchFeedbacksFormT = z.infer<typeof SearchFeedbacksFormMng.schema>;
