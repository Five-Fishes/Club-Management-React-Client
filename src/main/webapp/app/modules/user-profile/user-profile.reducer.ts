import axios from 'axios';
import { ICrudGetAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IUser, defaultValue } from 'app/shared/model/user.model';
import { IGetEntityWithoutParams } from 'app/shared/type/custom-action';

export const ACTION_TYPES = {
  FETCH_USERPROFILE: 'userProfile/FETCH_USERPROFILE',
  RESET: 'userProfile/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type UserState = Readonly<typeof initialState>;

// Reducers

export default (state: UserState = initialState, action): UserState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_USERPROFILE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case FAILURE(ACTION_TYPES.FETCH_USERPROFILE):
      return {
        ...state,
        updating: false,
        updateSuccess: false,
        loading: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERPROFILE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/users';

// Actions

export const getCurrentUserProfile: IGetEntityWithoutParams<IUser> = () => {
  const requestUrl = `${apiUrl}/current`;
  return {
    type: ACTION_TYPES.FETCH_USERPROFILE,
    payload: axios.get<IUser>(requestUrl)
  };
};
