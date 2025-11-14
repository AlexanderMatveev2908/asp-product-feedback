import { CheckFieldT, TxtFieldT } from '@/common/types/forms';
import { FormsUiFkt } from '@/core/ui_fkt/forms/forms';
import { ProductsLibShape } from '../../../lib_shape';

export interface FeedbackFormFields {
  title: TxtFieldT;
  category: CheckFieldT;
  status: CheckFieldT;
  content: TxtFieldT;
}

export class FeedbackFormUiFkt extends FormsUiFkt {
  private static title(): TxtFieldT {
    return this.txtFieldOf({
      name: 'title',
      label: 'Feedback Title',
      comment: 'Add a short, descriptive headline',
      place: '',
      type: 'text',
    });
  }

  private static category(): CheckFieldT {
    return this.checkFieldOf({
      name: 'title',
      label: 'Category',
      comment: 'Choose a category for your feedback',
      type: 'radio',
      options: ProductsLibShape.categories(),
    });
  }

  private static status(): CheckFieldT {
    return this.checkFieldOf({
      name: 'status',
      label: 'Update Status',
      comment: 'Change feature state',
      type: 'radio',
      options: ProductsLibShape.statuses(),
    });
  }

  private static content(): TxtFieldT {
    return this.txtFieldOf({
      name: 'content',
      label: 'Feedback Detail',
      comment: 'Include any specific comments on what should be improved, added, etc.',
      type: 'textarea',
      place: '',
    });
  }

  public static formFields(): FeedbackFormFields {
    return {
      title: this.title(),
      category: this.category(),
      status: this.status(),
      content: this.content(),
    };
  }
}
