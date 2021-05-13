import { AnyAction } from 'redux';

export const ACTION_TYPES = {
  LOGOUT: 'authentication/LOGOUT',
  FETCH_ACCOUNT: 'authentication/FETCH_ACCOUNT',
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
  isProfileCompleted: boolean;
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
  isCurrentAdministrator: false,
  isProfileCompleted: false,
};

// Reducer

export default (state: IAuthenticationInitialState = initialState, action: AnyAction): IAuthenticationInitialState => {
  switch (action.type) {
    case ACTION_TYPES.LOGOUT:
      return initialState;
    case ACTION_TYPES.FETCH_ACCOUNT:
      return {
        ...state,
        isAuthenticated: Boolean(action.payload.id),
        id: action.payload.id,
        firstName: action.payload.firstName,
        email: action.payload.email,
        imageUrl: action.payload.imageUrl,
        authorities: action.payload.authorities,
        eventHeadEventIds: action.payload.eventHeadEventIds,
        eventCrewEventIds: action.payload.eventCrewEventIds,
        isCurrentCCHead: action.payload.isCurrentCCHead,
        isCurrentAdministrator: action.payload.isCurrentAdministrator,
        isProfileCompleted: action.payload.isProfileCompleted,
      };
    default:
      return state;
  }
};
