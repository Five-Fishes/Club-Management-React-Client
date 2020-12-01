import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IUserCCInfo, defaultValue } from 'app/shared/model/user-cc-info.model';

export const ACTION_TYPES = {
  FETCH_USERCCINFO_LIST: 'userCCInfo/FETCH_USERCCINFO_LIST',
  FETCH_USERCCINFO: 'userCCInfo/FETCH_USERCCINFO',
  CREATE_USERCCINFO: 'userCCInfo/CREATE_USERCCINFO',
  UPDATE_USERCCINFO: 'userCCInfo/UPDATE_USERCCINFO',
  DELETE_USERCCINFO: 'userCCInfo/DELETE_USERCCINFO',
  RESET: 'userCCInfo/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IUserCCInfo>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type UserCCInfoState = Readonly<typeof initialState>;

// Reducer

export default (state: UserCCInfoState = initialState, action): UserCCInfoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_USERCCINFO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_USERCCINFO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_USERCCINFO):
    case REQUEST(ACTION_TYPES.UPDATE_USERCCINFO):
    case REQUEST(ACTION_TYPES.DELETE_USERCCINFO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_USERCCINFO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_USERCCINFO):
    case FAILURE(ACTION_TYPES.CREATE_USERCCINFO):
    case FAILURE(ACTION_TYPES.UPDATE_USERCCINFO):
    case FAILURE(ACTION_TYPES.DELETE_USERCCINFO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERCCINFO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERCCINFO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_USERCCINFO):
    case SUCCESS(ACTION_TYPES.UPDATE_USERCCINFO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_USERCCINFO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/user-cc-infos';

// Actions

export const getEntities: ICrudGetAllAction<IUserCCInfo> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_USERCCINFO_LIST,
  payload: axios.get<IUserCCInfo>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IUserCCInfo> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_USERCCINFO,
    payload: axios.get<IUserCCInfo>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IUserCCInfo> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_USERCCINFO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IUserCCInfo> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_USERCCINFO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IUserCCInfo> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_USERCCINFO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
