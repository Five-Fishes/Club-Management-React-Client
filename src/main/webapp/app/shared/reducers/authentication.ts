export const ACTION_TYPES = {
  LOGOUT: 'authentication/LOGOUT',
  FETCH_ACCOUNT: 'authentication/FETCH_ACCOUNT'
};

export interface IAuthenticationInitialState {
  isAuthenticated: boolean;
  authorities: string[];
  activated: boolean;
  firstName: string;
  id: number;
  imageUrl: string;
  email: string;
}

const initialState: IAuthenticationInitialState = {
  isAuthenticated: false,
  authorities: [],
  activated: false,
  firstName: '',
  id: NaN,
  imageUrl: '',
  email: ''
};

// Reducer

export default (state: IAuthenticationInitialState = initialState, action): IAuthenticationInitialState => {
  switch (action.type) {
    case ACTION_TYPES.LOGOUT:
      return {
        ...state,
        isAuthenticated: false
      };
    case ACTION_TYPES.FETCH_ACCOUNT:
      return {
        ...state,
        isAuthenticated: Boolean(action.payload),
        authorities: action.payload.authorities,
        activated: action.payload.activated,
        firstName: action.payload.firstName,
        id: action.payload.id,
        imageUrl: action.payload.imageUrl,
        email: action.payload.email
      };
    default:
      return state;
  }
};
