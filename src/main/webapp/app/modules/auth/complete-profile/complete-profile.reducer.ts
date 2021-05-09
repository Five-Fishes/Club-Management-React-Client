import axios from 'axios';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { ICrudGetAction, ICrudPutAction } from 'react-jhipster';

import { IUserUniInfo, defaultValue } from 'app/shared/model/user-uni-info.model';
import { IFaculty } from 'app/shared/model/faculty.model';
import { ICourseProgram } from 'app/shared/model/course-program.model';
import { IYearSession } from 'app/shared/model/year-session.model';
import { checkUserProfileCompleted } from 'app/shared/services/auth.service';
import { IGetActionWithoutParam } from 'app/shared/type/general-custom-action';

export const ACTION_TYPES = {
  COMPLETE_USERPROFILE: 'completeProfile/COMPLETE_USERPROFILE',
  FETCH_COURSEPROGRAM_LIST: 'completeProfile/FETCH_COURSEPROGRAM_LIST',
  FETCH_FACULTY_LIST: 'completeProfile/FETCH_FECULTY_LIST',
  FETCH_YEARSESSION_LIST: 'completeProfile/FETCH_YEARSESSION_LIST',
  FETCH_USERPROFILE_UNIINFO: 'completeProfile/FETCH_USERPROFILE_UNIINFO',
  RESET: 'completeProfile/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  userProfile: defaultValue,
  facultyList: [] as ReadonlyArray<IFaculty>,
  courseProgramList: [] as ReadonlyArray<ICourseProgram>,
  yearSessionList: [] as ReadonlyArray<IYearSession>,
  isProfileCompleted: false,
  updating: false,
  updateSuccess: false,
};

export type CompleteProfileState = Readonly<typeof initialState>;

// Reducers

export default (state: CompleteProfileState = initialState, action): CompleteProfileState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.COMPLETE_USERPROFILE):
    case REQUEST(ACTION_TYPES.FETCH_FACULTY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_COURSEPROGRAM_LIST):
    case REQUEST(ACTION_TYPES.FETCH_YEARSESSION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_USERPROFILE_UNIINFO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.COMPLETE_USERPROFILE):
    case FAILURE(ACTION_TYPES.FETCH_USERPROFILE_UNIINFO):
      return {
        ...state,
        updating: false,
        updateSuccess: false,
        loading: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.COMPLETE_USERPROFILE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        loading: false,
        errorMessage: null,
        userProfile: action?.payload?.data ?? defaultValue,
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERPROFILE_UNIINFO):
      return {
        ...state,
        loading: false,
        errorMessage: null,
        userProfile: action?.payload?.data ?? defaultValue,
      };
    case ACTION_TYPES.FETCH_FACULTY_LIST:
      return {
        ...state,
        loading: false,
        facultyList: action?.payload?.data ?? [],
      };
    case ACTION_TYPES.FETCH_COURSEPROGRAM_LIST:
      return {
        ...state,
        loading: false,
        courseProgramList: action?.payload?.data ?? [],
      };
    case ACTION_TYPES.FETCH_YEARSESSION_LIST:
      return {
        ...state,
        loading: false,
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

const apiUrl = 'api/account';

// Actions

export const completeUserProfile: ICrudPutAction<IUserUniInfo> = entity => async dispatch => {
  const requestUrl = `${apiUrl}/profile`;
  const result = await dispatch({
    type: ACTION_TYPES.COMPLETE_USERPROFILE,
    payload: axios.post(requestUrl, cleanEntity(entity)),
  });
  await checkUserProfileCompleted();
  return result;
};

export const fetchUserProfileWithUniInfo: IGetActionWithoutParam<IUserUniInfo> = () => {
  const requestUrl = `api/user-uni-infos/current`;
  return {
    type: ACTION_TYPES.FETCH_USERPROFILE_UNIINFO,
    payload: axios.get<IUserUniInfo>(`${requestUrl}`),
  };
};
