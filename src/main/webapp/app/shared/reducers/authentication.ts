import { AnyAction } from 'redux';
import { FAILURE, REQUEST, SUCCESS } from './action-type.util';
import { AxiosError } from 'axios';

export const ACTION_TYPES = {
  LOGOUT: 'authentication/LOGOUT',
  FETCH_ACCOUNT: 'authentication/FETCH_ACCOUNT',
};

export interface IAuthenticationInitialState {
  loading: boolean;
  errResponse: null | AxiosError;
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
  loading: false,
  errResponse: null,
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
    case REQUEST(ACTION_TYPES.FETCH_ACCOUNT):
      return {
        ...state,
        errResponse: null,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_ACCOUNT):
      return {
        ...state,
        loading: false,
        errResponse: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ACCOUNT):
      return {
        ...state,
        loading: false,
        isAuthenticated: Boolean(action.payload.data.id),
        id: action.payload.data.id,
        firstName: action.payload.data.firstName,
        email: action.payload.data.email,
        imageUrl: action.payload.data.imageUrl,
        authorities: action.payload.data.authorities,
        eventHeadEventIds: action.payload.data.eventHeadEventIds,
        eventCrewEventIds: action.payload.data.eventCrewEventIds,
        isCurrentCCHead: action.payload.data.isCurrentCCHead,
        isCurrentAdministrator: action.payload.data.isCurrentAdministrator,
        isProfileCompleted: action.payload.data.isProfileCompleted,
      };
    default:
      return state;
  }
};
