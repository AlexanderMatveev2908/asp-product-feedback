import { TxtFieldT } from '@/common/types/forms';
import { FormsUiFkt } from '@/core/ui_fkt/forms/forms';

export class CommentFormUiFkt extends FormsUiFkt {
  public static readonly field: () => TxtFieldT = () =>
    this.txtFieldOf({
      name: 'content',
      type: 'textarea',
      comment: '',
      label: '',
      place: 'Type your comment here',
    });
}
