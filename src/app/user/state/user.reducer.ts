import { createFeatureSelector, createSelector } from '@ngrx/store';


const initialState: UserState = {
  maskUsername: false
}

export function reducer(state = initialState, action): UserState {
  switch (action.type) {
    case 'TOGGLE_USERNAME_MASK':
      return {
        ...state,
        maskUsername: action.payload
      }
    default:
      return state;
  }
}

export interface UserState {
  maskUsername: boolean;
}

const getUserFeature = createFeatureSelector<UserState>('user');

export const getMaskUserName = createSelector(getUserFeature, state => state.maskUsername);
