import { createFeatureSelector } from '@ngrx/store';
import { SidebarMobileStateT } from './reducer';

export const getSidebarMobileState = createFeatureSelector<SidebarMobileStateT>('sidebarMobile');
