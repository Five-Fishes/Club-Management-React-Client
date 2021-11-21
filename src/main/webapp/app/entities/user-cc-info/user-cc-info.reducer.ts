import axios, { AxiosError } from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';
import { AnyAction } from 'redux';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IUserCCInfo, defaultValue } from 'app/shared/model/user-cc-info.model';
import { IGetUsersWithFilters } from 'app/shared/type/custom-action';

export const ACTION_TYPES = {
  FETCH_USERCCINFO_LIST: 'userCCInfo/FETCH_USERCCINFO_LIST',
  FETCH_USERCCINFO: 'userCCInfo/FETCH_USERCCINFO',
  CREATE_USERCCINFO: 'userCCInfo/CREATE_USERCCINFO',
  UPDATE_USERCCINFO: 'userCCInfo/UPDATE_USERCCINFO',
  DELETE_USERCCINFO: 'userCCInfo/DELETE_USERCCINFO',
  FETCH_YEAR_SESSION_OPTIONS: 'FETCH_YEAR_SESSION_OPTIONS',
  SET_SELECTED_YEAR_SESSION_FILTER: 'SET_SELECTED_YEAR_SESSION_FILTER',
  RESET: 'userCCInfo/RESET',
};

const initialState: IUserCCInfoState = {
  loading: false,
  errResponse: null,
  entities: [],
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
  yearSessionOptions: [],
  selectedYearSessionFilter: '',
};

export interface IUserCCInfoState {
  loading: boolean;
  errResponse: null | AxiosError;
  entities: IUserCCInfo[];
  entity: Readonly<IUserCCInfo>;
  updating: boolean;
  updateSuccess: boolean;
  yearSessionOptions: string[];
  selectedYearSessionFilter: string;
}

// Reducer

export default (state: IUserCCInfoState = initialState, action: AnyAction): IUserCCInfoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_USERCCINFO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_USERCCINFO):
    case REQUEST(ACTION_TYPES.FETCH_YEAR_SESSION_OPTIONS):
      return {
        ...state,
        errResponse: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_USERCCINFO):
    case REQUEST(ACTION_TYPES.UPDATE_USERCCINFO):
    case REQUEST(ACTION_TYPES.DELETE_USERCCINFO):
      return {
        ...state,
        errResponse: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_USERCCINFO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_USERCCINFO):
    case FAILURE(ACTION_TYPES.CREATE_USERCCINFO):
    case FAILURE(ACTION_TYPES.UPDATE_USERCCINFO):
    case FAILURE(ACTION_TYPES.DELETE_USERCCINFO):
    case FAILURE(ACTION_TYPES.FETCH_YEAR_SESSION_OPTIONS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errResponse: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERCCINFO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERCCINFO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_USERCCINFO):
    case SUCCESS(ACTION_TYPES.UPDATE_USERCCINFO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_USERCCINFO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case SUCCESS(ACTION_TYPES.FETCH_YEAR_SESSION_OPTIONS):
      return {
        ...state,
        loading: false,
        yearSessionOptions: action.payload.data,
        selectedYearSessionFilter: action.payload.data[0],
      };
    case ACTION_TYPES.SET_SELECTED_YEAR_SESSION_FILTER:
      const { selectedYearSession } = action.payload;
      return {
        ...state,
        selectedYearSessionFilter: selectedYearSession,
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/user-cc-infos';

// Actions

export const getEntities: ICrudGetAllAction<IUserCCInfo> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_USERCCINFO_LIST,
  payload: axios.get<IUserCCInfo>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IUserCCInfo> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_USERCCINFO,
    payload: axios.get<IUserCCInfo>(requestUrl),
  };
};

export const getUsersWithoutFamily: ICrudGetAllAction<IUserCCInfo> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_USERCCINFO_LIST,
  payload: axios.get<IUserCCInfo>(`${apiUrl}?clubFamilyCode.specified=false`),
});

export const getUsersWithFamilyCode: IGetUsersWithFilters<IUserCCInfo> = (familyCode: string, yearSession?: string) => {
  let requestUrl = `${apiUrl}?clubFamilyCode.equals=${familyCode}`;
  if (yearSession) {
    requestUrl = `${requestUrl}&yearSession.equals=${yearSession}`;
  }
  return {
    type: ACTION_TYPES.FETCH_USERCCINFO_LIST,
    payload: axios.get<IUserCCInfo>(requestUrl),
  };
};

export const getUsersWithFilter: any = (familyCode?: string, filters?: any) => {
  let requestUrl = apiUrl;

  if (familyCode) {
    requestUrl = `${apiUrl}?clubFamilyCode.equals=${familyCode}`;
  }
  if (filters) {
    for (const filter in filters) {
      if (filters[filter]) {
        requestUrl = `${requestUrl}&${filter}.equals=${filters[filter]}`;
      }
    }
  }

  return {
    type: ACTION_TYPES.FETCH_USERCCINFO_LIST,
    payload: axios.get<IUserCCInfo>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IUserCCInfo> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_USERCCINFO,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const updateEntity: ICrudPutAction<IUserCCInfo> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_USERCCINFO,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IUserCCInfo> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_USERCCINFO,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const getYearSessionOptions: ICrudGetAllAction<string> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_YEAR_SESSION_OPTIONS,
  payload: axios.get<string>(
    `api/year-sessions/values?cacheBuster=${new Date().getTime()}${sort ? `&page=${page}&size=${size}&sort=${sort}` : ''}`
  ),
});

export const setSelectedYearSessionFilter = (selectedYearSession: string) => ({
  type: ACTION_TYPES.SET_SELECTED_YEAR_SESSION_FILTER,
  payload: {
    selectedYearSession,
  },
});

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
