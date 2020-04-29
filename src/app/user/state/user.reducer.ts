export function reducer(state: UserState, action): UserState {
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
