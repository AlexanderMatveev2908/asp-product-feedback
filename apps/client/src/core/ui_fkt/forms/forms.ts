import { CheckFieldT, PairValLabelT, TxtFieldT } from '@/common/types/forms';
import { RootUiFkt } from '../root';
import { LibPrs } from '@/core/lib/data_structure/prs/prs';

export class FormsUiFkt extends RootUiFkt {
  private static withSnakeTestField<T>(arg: T & { name: string }): T & { field: string } {
    return {
      ...arg,
      field: LibPrs.toSnake(arg.name),
    };
  }

  public static txtFieldOf(arg: Omit<TxtFieldT, 'id' | 'field'>): TxtFieldT {
    return this.withID(this.withSnakeTestField(arg));
  }

  public static checkFieldOf(
    arg: Omit<CheckFieldT, 'id' | 'field' | 'options'> & { options: PairValLabelT[] }
  ): CheckFieldT {
    return this.withID({ ...this.withSnakeTestField(arg), options: this.listWithIDs(arg.options) });
  }
}
