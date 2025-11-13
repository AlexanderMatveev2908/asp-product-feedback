import { computed, Injectable, Signal } from '@angular/core';
import { SidebarMobileStateT } from './reducer/reducer';
import { getSidebarMobileState } from './reducer/selectors';
import { SidebarMobileActT } from './reducer/actions';
import { UseKitSliceSvc } from '@/core/services/use_kit_slice';

@Injectable({
  providedIn: 'root',
})
export class SidebarMobileSlice extends UseKitSliceSvc {
  public get sidebarMobileState(): Signal<SidebarMobileStateT> {
    return this.store.selectSignal(getSidebarMobileState);
  }

  public reset(): void {
    this.store.dispatch(SidebarMobileActT.RESET__SIDEBAR_MOBILE_STATE());
  }

  public isOpen: Signal<boolean> = computed(() => this.sidebarMobileState().isOpen);

  public setIsOpen(v: boolean): void {
    this.store.dispatch(SidebarMobileActT.SET_OPEN({ v }));
  }
}
