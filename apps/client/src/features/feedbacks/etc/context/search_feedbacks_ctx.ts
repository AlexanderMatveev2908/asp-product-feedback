import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SearchFeedbacksFormMng } from '../forms/search_feedbacks/form_mng';

@Injectable({
  providedIn: 'root',
})
export class SearchFeedbacksCtx {
  public readonly form: FormGroup = SearchFeedbacksFormMng.form;
}
