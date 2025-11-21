/* eslint-disable no-magic-numbers */
import { Reg } from '@/core/paperwork/reg';
import z, { ZodObject, ZodString } from 'zod';
import { FeedLibShape } from '../../../lib_shape';
import { FormControl, FormGroup } from '@angular/forms';
import { RootFormMng } from '@/core/paperwork/root_form_mng/root_form_mng';

export type FormKeyT = 'title' | 'category' | 'status' | 'content';

type SchemaPostT = ZodObject<{
  title: ZodString;
  category: ZodString;
  content: ZodString;
}>;

export class FeedbackFormMng extends RootFormMng {
  public static readonly schemaPost: SchemaPostT = z.object({
    title: z
      .string()
      .min(1, 'Title required')
      .max(100, 'Max length exceeded')
      .regex(Reg.TXT, 'Invalid title'),
    // ? you could use an enum but using a string and checking then
    // ? with refine is easier than:
    // ? 1. forcing the value to undefined if empty string
    // ? 2. marking as optional the field
    // ? 3. base logic on refine to yell after preprocessor
    // ? which I usually do with enums, so this time I preferred keeping it faster and more concise
    category: z
      .string()
      .min(1, 'Category required')
      .refine(
        (v: string) => (!v ? true : FeedLibShape.includedByCategories(v)),
        'Invalid category'
      ),
    content: z
      .string()
      .min(1, 'Content required')
      .max(250, 'Max length exceeded')
      .regex(Reg.TXT, 'Invalid content'),
  });

  public static readonly schemaPut: SchemaPostT & ZodObject<{ status: ZodString }> =
    this.schemaPost.extend({
      status: z
        .string()
        .min(1, 'Status required')
        .refine((v: string) => (!v ? true : FeedLibShape.includedByStatus(v)), 'Invalid category'),
    });

  public static readonly formPost: () => FormGroup = () =>
    new FormGroup<{
      title: FormControl<string>;
      category: FormControl<string>;
      content: FormControl<string>;
    }>(
      {
        title: new FormControl('', { nonNullable: true }),
        category: new FormControl(FeedLibShape.defCat(), { nonNullable: true }),
        content: new FormControl('', { nonNullable: true }),
      },
      {
        validators: this.validate(this.schemaPost),
      }
    );

  public static readonly formPut: () => FormGroup = () =>
    new FormGroup<{
      title: FormControl<string>;
      category: FormControl<string>;
      status: FormControl<string>;
      content: FormControl<string>;
    }>(
      {
        title: new FormControl('', { nonNullable: true }),
        category: new FormControl(FeedLibShape.defCat(), { nonNullable: true }),
        status: new FormControl('', { nonNullable: true }),
        content: new FormControl('', { nonNullable: true }),
      },
      {
        validators: this.validate(this.schemaPut),
      }
    );

  public static defPostForm(): FeedFormPostT {
    return {
      title: '',
      category: FeedLibShape.defCat(),
      content: '',
    };
  }

  public static defPutForm(): FeedFormPutT {
    return {
      title: '',
      category: FeedLibShape.defCat(),
      status: '',
      content: '',
    };
  }
}

export type FeedFormPostT = z.infer<typeof FeedbackFormMng.schemaPost>;

export type FeedFormPutT = z.infer<typeof FeedbackFormMng.schemaPut>;
