/* eslint-disable no-magic-numbers */
import { Reg } from '@/core/paperwork/reg';
import { RootFormMng } from '@/core/paperwork/root_form_mng/root_form_mng';
import { FormControl, FormGroup } from '@angular/forms';
import z, { ZodObject, ZodString } from 'zod';

export class ContentFormMng extends RootFormMng {
  public static readonly schema: ZodObject<{
    content: ZodString;
  }> = z.object({
    content: z
      .string()
      .min(1, 'content required')
      .max(250, 'max length exceeded')
      .regex(Reg.TXT, 'content invalid'),
  });

  public static readonly form: () => FormGroup = () =>
    new FormGroup<{ content: FormControl<string> }>(
      {
        content: new FormControl('', { nonNullable: true }),
      },
      {
        validators: this.validate(this.schema),
      }
    );

  public static defFormData(): ContentFormT {
    return {
      content: '',
    };
  }
}

export type ContentFormT = z.infer<typeof ContentFormMng.schema>;
