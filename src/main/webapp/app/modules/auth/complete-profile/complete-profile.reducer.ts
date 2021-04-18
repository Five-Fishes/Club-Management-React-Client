import axios from 'axios';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { ICrudPutAction } from 'react-jhipster';

import { IUserUniInfo, defaultValue } from 'app/shared/model/user-uni-info.model';

export const ACTION_TYPES = {
  COMPLETE_USERPROFILE: 'completeProfile/COMPLETE_USERPROFILE',
  RESET: 'completeProfile/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  userProfile: defaultValue,
  isProfileCompleted: false,
  updating: false,
  updateSuccess: false
};

export type UserState = Readonly<typeof initialState>;

// Reducers

export default (state: UserState = initialState, action): UserState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.COMPLETE_USERPROFILE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case FAILURE(ACTION_TYPES.COMPLETE_USERPROFILE):
      return {
        ...state,
        updating: false,
        updateSuccess: false,
        loading: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.COMPLETE_USERPROFILE):
      return {
        ...state,
        loading: false,
        userProfile: action.payload.data
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/account';

// Actions

export const completeUserProfile: ICrudPutAction<IUserUniInfo> = entity => async dispatch => {
  const requestUrl = `${apiUrl}/profile`;
  const result = await dispatch({
    type: ACTION_TYPES.COMPLETE_USERPROFILE,
    payload: axios.post(requestUrl, cleanEntity(entity))
  });
  // TODO: refresh user complete profile status
  return result;
};
