import { CheckFieldT, TxtFieldT } from '@/common/types/forms';
import { FormsUiFkt } from '@/core/ui_fkt/forms/forms';
import { ProductsUiFkt } from '../../../ui_fkt';

export class FeedbackFormUiFkt extends FormsUiFkt {
  public static title(): TxtFieldT {
    return this.txtFieldOf({
      name: 'title',
      label: 'Feedback Title',
      comment: 'Add a short, descriptive headline',
      place: '',
      type: 'text',
    });
  }

  public static category(): CheckFieldT {
    return this.checkFieldOf({
      name: 'title',
      label: 'Feedback Title',
      comment: 'Add a short, descriptive headline',
      type: 'radio',
      options: ProductsUiFkt.categories(),
    });
  }

  public static status(): CheckFieldT {
    return this.checkFieldOf({
      name: 'status',
      label: 'Update Status',
      comment: 'Change feature state',
      type: 'radio',
      options: ProductsUiFkt.statuses(),
    });
  }

  public static content(): TxtFieldT {
    return this.txtFieldOf({
      name: 'content',
      label: 'Feedback Detail',
      comment: 'Include any specific comments on what should be improved, added, etc.',
      type: 'textarea',
      place: '',
    });
  }
}
