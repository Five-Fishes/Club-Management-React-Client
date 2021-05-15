import axios, { AxiosError } from 'axios';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IUserUniInfo, defaultValue as defaultUserUniInfo } from 'app/shared/model/user-uni-info.model';
import { IUserCCInfo } from 'app/shared/model/user-cc-info.model';
import { IUserCCRoleInfo } from 'app/shared/model/user-cc-role-info.model';
import { IGetEntityWithoutParams } from 'app/shared/type/custom-action';
import { AnyAction } from 'redux';
import { ICrudPutAction } from 'react-jhipster';
import { cleanEntity } from 'app/shared/util/entity-utils';

export const ACTION_TYPES = {
  FETCH_USERPROFILE: 'userProfile/FETCH_USERPROFILE',
  FETCH_USERPROFILE_CCINFO: 'userProfile/FETCH_USERPROFILE_CCINFO',
  FETCH_USERPROFILE_CCROLE: 'userProfile/FETCH_USERPROFILE_CCROLE',
  UPDATE_USERPROFILE: 'userProfile/UPDATE_USERPROFILE',
  SET_CURRENT_TAB: 'userProfile/SET_CURRENT_TAB',
  RESET: 'userProfile/RESET',
};

const initialState: IUserState = {
  loading: false,
  errResponse: null,
  entity: defaultUserUniInfo,
  userCCEvolutionInfo: [] as ReadonlyArray<IUserCCInfo>,
  userCCRolesInfo: [] as ReadonlyArray<IUserCCRoleInfo>,
  updating: false,
  updateSuccess: false,
  currentProfileTab: '',
};

export interface IUserState {
  loading: boolean;
  errResponse: null | AxiosError;
  entity: IUserUniInfo;
  userCCEvolutionInfo: ReadonlyArray<IUserCCInfo>;
  userCCRolesInfo: ReadonlyArray<IUserCCRoleInfo>;
  updating: boolean;
  updateSuccess: boolean;
  currentProfileTab: string;
}

// Reducers

export default (state: IUserState = initialState, action: AnyAction): IUserState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_USERPROFILE):
    case REQUEST(ACTION_TYPES.UPDATE_USERPROFILE):
      return {
        ...state,
        errResponse: null,
        updateSuccess: false,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_USERPROFILE):
    case FAILURE(ACTION_TYPES.UPDATE_USERPROFILE):
      return {
        ...state,
        updating: false,
        updateSuccess: false,
        loading: false,
        errResponse: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERPROFILE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERPROFILE_CCINFO):
      return {
        ...state,
        loading: false,
        userCCEvolutionInfo: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERPROFILE_CCROLE):
      return {
        ...state,
        loading: false,
        userCCRolesInfo: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.UPDATE_USERPROFILE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
        updateSuccess: true,
        updating: false,
      };
    case ACTION_TYPES.SET_CURRENT_TAB:
      return {
        ...state,
        currentProfileTab: action.payload.currentTab,
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

// Actions

export const getCurrentUserProfile: IGetEntityWithoutParams<IUserUniInfo> = () => {
  const requestUrl = `api/user-uni-infos/current`;
  return {
    type: ACTION_TYPES.FETCH_USERPROFILE,
    payload: axios.get<IUserUniInfo>(requestUrl),
  };
};

export const getCurrentUserCCInfoProfile: IGetEntityWithoutParams<IUserCCInfo> = () => {
  const requestUrl = `api/user-cc-infos/current`;
  return {
    type: ACTION_TYPES.FETCH_USERPROFILE_CCINFO,
    payload: axios.get<IUserCCInfo>(requestUrl),
  };
};

export const getCurrentUserCCRolesProfile: IGetEntityWithoutParams<IUserCCRoleInfo> = () => {
  const requestUrl = `api/user-cc-infos/roles/current`;
  return {
    type: ACTION_TYPES.FETCH_USERPROFILE_CCROLE,
    payload: axios.get<IUserCCRoleInfo>(requestUrl),
  };
};

export const updateUserProfile: ICrudPutAction<IUserUniInfo> = entity => async dispatch => {
  const requestUrl = `api/account/profile`;
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_USERPROFILE,
    payload: axios.post(requestUrl, cleanEntity(entity)),
  });
  return result;
};

export const setUserProfileCurrentTab = (currentTab: string) => ({
  type: ACTION_TYPES.SET_CURRENT_TAB,
  payload: {
    currentTab,
  },
});
