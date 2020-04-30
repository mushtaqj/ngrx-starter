import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';


const getUserFeature = createFeatureSelector<UserState>('user');

export const getMaskUserName = createSelector(getUserFeature, state => state.maskUsername);
