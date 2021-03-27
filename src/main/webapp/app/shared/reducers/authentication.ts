export const ACTION_TYPES = {
  LOGOUT: 'authentication/LOGOUT',
  FETCH_ACCOUNT: 'authentication/FETCH_ACCOUNT'
};

export interface IAuthenticationInitialState {
  isAuthenticated: boolean;
  id: number;
  firstName: string;
  email: string;
  imageUrl: string;
  authorities: string[];
  eventHeadEventIds: number[];
  eventCrewEventIds: number[];
  isCurrentCCHead: boolean;
  isCurrentAdministrator: boolean;
}

const initialState: IAuthenticationInitialState = {
  isAuthenticated: false,
  id: NaN,
  firstName: '',
  email: '',
  imageUrl: '',
  authorities: [],
  eventHeadEventIds: [],
  eventCrewEventIds: [],
  isCurrentCCHead: false,
  isCurrentAdministrator: false
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
