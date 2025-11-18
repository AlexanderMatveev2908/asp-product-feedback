import { computed, Injectable, Signal } from '@angular/core';
import { UserStateT } from './reducer/reducer';
import { getUserState } from './reducer/selectors';
import { UserActT } from './reducer/actions';
import { UseKitSliceSvc } from '@/core/services/use_kit_slice';
import { Nullable } from '@/common/types/etc';
import { User } from './etc/types';

@Injectable({
  providedIn: 'root',
})
export class UserSlice extends UseKitSliceSvc {
  public get userState(): Signal<UserStateT> {
    return this.store.selectSignal(getUserState);
  }

  public readonly user: Signal<Nullable<User>> = computed(() => this.userState().user);

  public setUser(user: User): void {
    this.store.dispatch(UserActT.SET_USER(user));
  }

  public reset(): void {
    this.store.dispatch(UserActT.RESET__USER_STATE());
  }
}
