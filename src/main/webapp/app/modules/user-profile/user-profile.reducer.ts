import axios, { AxiosError } from 'axios';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IUserUniInfo, defaultValue as defaultUserUniInfo } from 'app/shared/model/user-uni-info.model';
import { IUserCCInfo } from 'app/shared/model/user-cc-info.model';
import { IUserCCRoleInfo } from 'app/shared/model/user-cc-role-info.model';
import { IGetEntityWithoutParams } from 'app/shared/type/custom-action';
import { AnyAction } from 'redux';
import { ICrudPutAction } from 'react-jhipster';
import { cleanEntity } from 'app/shared/util/entity-utils';

import { fetchAccount } from 'app/shared/services/auth.service';
import { IFaculty } from 'app/shared/model/faculty.model';
import { ICourseProgram } from 'app/shared/model/course-program.model';
import { IYearSession } from 'app/shared/model/year-session.model';

export const ACTION_TYPES = {
  FETCH_USERPROFILE: 'userProfile/FETCH_USERPROFILE',
  FETCH_USERPROFILE_CCINFO: 'userProfile/FETCH_USERPROFILE_CCINFO',
  FETCH_USERPROFILE_CCROLE: 'userProfile/FETCH_USERPROFILE_CCROLE',
  UPDATE_USERPROFILE: 'userProfile/UPDATE_USERPROFILE',
  COMPLETE_USERPROFILE: 'userProfile/COMPLETE_USERPROFILE',
  SET_CURRENT_TAB: 'userProfile/SET_CURRENT_TAB',
  FETCH_COURSEPROGRAM_LIST: 'userProfile/FETCH_COURSEPROGRAM_LIST',
  FETCH_FACULTY_LIST: 'userProfile/FETCH_FECULTY_LIST',
  FETCH_YEARSESSION_LIST: 'userProfile/FETCH_YEARSESSION_LIST',
  RESET: 'userProfile/RESET',
};

const initialState: IUserState = {
  loading: false,
  errResponse: null,
  userProfile: defaultUserUniInfo,
  userCCEvolutionInfo: [] as ReadonlyArray<IUserCCInfo>,
  userCCRolesInfo: [] as ReadonlyArray<IUserCCRoleInfo>,
  updating: false,
  updateSuccess: false,
  currentProfileTab: 'Stats',
  facultyList: [] as ReadonlyArray<IFaculty>,
  courseProgramList: [] as ReadonlyArray<ICourseProgram>,
  yearSessionList: [] as ReadonlyArray<IYearSession>,
};

export interface IUserState {
  loading: boolean;
  errResponse: null | AxiosError;
  userProfile: Readonly<IUserUniInfo>;
  userCCEvolutionInfo: ReadonlyArray<IUserCCInfo>;
  userCCRolesInfo: ReadonlyArray<IUserCCRoleInfo>;
  updating: boolean;
  updateSuccess: boolean;
  currentProfileTab: string;
  facultyList: ReadonlyArray<IFaculty>;
  courseProgramList: ReadonlyArray<ICourseProgram>;
  yearSessionList: ReadonlyArray<IYearSession>;
}

// Reducers

export default (state: IUserState = initialState, action: AnyAction): IUserState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_USERPROFILE):
    case REQUEST(ACTION_TYPES.UPDATE_USERPROFILE):
    case REQUEST(ACTION_TYPES.COMPLETE_USERPROFILE):
    case REQUEST(ACTION_TYPES.FETCH_FACULTY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_COURSEPROGRAM_LIST):
    case REQUEST(ACTION_TYPES.FETCH_YEARSESSION_LIST):
      return {
        ...state,
        errResponse: null,
        updateSuccess: false,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_USERPROFILE):
    case FAILURE(ACTION_TYPES.UPDATE_USERPROFILE):
    case FAILURE(ACTION_TYPES.COMPLETE_USERPROFILE):
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
        userProfile: action.payload.data,
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
        userProfile: action.payload.data,
        updateSuccess: true,
        updating: false,
      };
    case SUCCESS(ACTION_TYPES.COMPLETE_USERPROFILE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        loading: false,
        errResponse: null,
        userProfile: action?.payload?.data || defaultUserUniInfo,
      };
    case ACTION_TYPES.SET_CURRENT_TAB:
      return {
        ...state,
        currentProfileTab: action.payload.currentTab,
      };
    case ACTION_TYPES.FETCH_FACULTY_LIST:
      return {
        ...state,
        facultyList: action?.payload?.data ?? [],
      };
    case ACTION_TYPES.FETCH_COURSEPROGRAM_LIST:
      return {
        ...state,
        courseProgramList: action?.payload?.data ?? [],
      };
    case ACTION_TYPES.FETCH_YEARSESSION_LIST:
      return {
        ...state,
        yearSessionList: action?.payload?.data ?? [],
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

export const updateUserProfile: ICrudPutAction<IUserUniInfo> = userProfile => async dispatch => {
  const requestUrl = `api/account/profile`;
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_USERPROFILE,
    payload: axios.post(requestUrl, cleanEntity(userProfile)),
  });
  return result;
};

export const completeUserProfile: ICrudPutAction<IUserUniInfo> = entity => async dispatch => {
  const requestUrl = `api/account/profile`;
  const result = await dispatch({
    type: ACTION_TYPES.COMPLETE_USERPROFILE,
    payload: axios.post(requestUrl, cleanEntity(entity)),
  });
  await fetchAccount();
  return result;
};

export const setUserProfileCurrentTab = (currentTab: string) => ({
  type: ACTION_TYPES.SET_CURRENT_TAB,
  payload: {
    currentTab,
  },
});
