import { createFeatureSelector } from '@ngrx/store';
import { FeedbacksStateT } from './reducer';

export const getProductsState = createFeatureSelector<FeedbacksStateT>('feedbacks');
