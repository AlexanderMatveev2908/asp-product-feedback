import { WithIdT } from './etc';

export type InputTxtT = 'text' | 'email' | 'password' | 'textarea';
export type CheckT = 'radio' | 'checkbox';

export type BaseFieldT = WithIdT<{
  name: string;
  field: string;
  label: string;
  comment: string;
}>;

export interface TxtFieldT extends BaseFieldT {
  place: string;
  type: InputTxtT;
}

export interface CheckFieldT extends BaseFieldT {
  type: CheckT;
  options: WithIdT<PairValLabelT | PairValLabelTypedT<string>>[];
}

export type PairValLabelT = WithIdT<{
  val: string;
  label: string;
}>;

export type PairValLabelTypedT<T> = WithIdT<{
  label: string;
  val: T;
}>;
