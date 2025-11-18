import { computed, Injectable, Signal } from '@angular/core';
import { getWakeUpState } from './reducer/selectors';
import { UseKitSliceSvc } from '@/core/services/use_kit_slice';
import { WakeUpStateT } from './reducer/reducer';
import { WakeUpActT } from './reducer/actions';

@Injectable({
  providedIn: 'root',
})
export class WakeUpSlice extends UseKitSliceSvc {
  public get wakeUpState(): Signal<WakeUpStateT> {
    return this.store.selectSignal(getWakeUpState);
  }

  public readonly awake: Signal<boolean> = computed(() => this.wakeUpState().awake);

  public setAwake(): void {
    this.store.dispatch(WakeUpActT.SET_AWAKE());
  }
}
