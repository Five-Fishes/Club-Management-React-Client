import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IUserUniInfo, defaultValue } from 'app/shared/model/user-uni-info.model';

export const ACTION_TYPES = {
  FETCH_USERUNIINFO_LIST: 'userUniInfo/FETCH_USERUNIINFO_LIST',
  FETCH_USERUNIINFO: 'userUniInfo/FETCH_USERUNIINFO',
  CREATE_USERUNIINFO: 'userUniInfo/CREATE_USERUNIINFO',
  UPDATE_USERUNIINFO: 'userUniInfo/UPDATE_USERUNIINFO',
  DELETE_USERUNIINFO: 'userUniInfo/DELETE_USERUNIINFO',
  RESET: 'userUniInfo/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IUserUniInfo>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type UserUniInfoState = Readonly<typeof initialState>;

// Reducer

export default (state: UserUniInfoState = initialState, action): UserUniInfoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_USERUNIINFO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_USERUNIINFO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_USERUNIINFO):
    case REQUEST(ACTION_TYPES.UPDATE_USERUNIINFO):
    case REQUEST(ACTION_TYPES.DELETE_USERUNIINFO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_USERUNIINFO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_USERUNIINFO):
    case FAILURE(ACTION_TYPES.CREATE_USERUNIINFO):
    case FAILURE(ACTION_TYPES.UPDATE_USERUNIINFO):
    case FAILURE(ACTION_TYPES.DELETE_USERUNIINFO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERUNIINFO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERUNIINFO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_USERUNIINFO):
    case SUCCESS(ACTION_TYPES.UPDATE_USERUNIINFO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_USERUNIINFO):
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

const apiUrl = 'api/user-uni-infos';

// Actions

export const getEntities: ICrudGetAllAction<IUserUniInfo> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_USERUNIINFO_LIST,
  payload: axios.get<IUserUniInfo>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IUserUniInfo> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_USERUNIINFO,
    payload: axios.get<IUserUniInfo>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IUserUniInfo> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_USERUNIINFO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IUserUniInfo> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_USERUNIINFO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IUserUniInfo> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_USERUNIINFO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
