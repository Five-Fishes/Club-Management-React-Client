import axios, { AxiosError } from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IClubFamily, defaultValue } from 'app/shared/model/club-family.model';
import { AnyAction } from 'redux';

export const ACTION_TYPES = {
  FETCH_CLUBFAMILY_LIST: 'clubFamily/FETCH_CLUBFAMILY_LIST',
  FETCH_CLUBFAMILY: 'clubFamily/FETCH_CLUBFAMILY',
  CREATE_CLUBFAMILY: 'clubFamily/CREATE_CLUBFAMILY',
  UPDATE_CLUBFAMILY: 'clubFamily/UPDATE_CLUBFAMILY',
  DELETE_CLUBFAMILY: 'clubFamily/DELETE_CLUBFAMILY',
  SET_BLOB: 'clubFamily/SET_BLOB',
  RESET: 'clubFamily/RESET',
};

const initialState: IClubFamilyState = {
  loading: false,
  errResponse: null,
  entities: [] as ReadonlyArray<IClubFamily>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export interface IClubFamilyState {
  loading: boolean;
  errResponse: null | AxiosError;
  entities: ReadonlyArray<IClubFamily>;
  entity: Readonly<IClubFamily>;
  updating: boolean;
  updateSuccess: boolean;
}

// Reducer

export default (state: IClubFamilyState = initialState, action: AnyAction): IClubFamilyState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CLUBFAMILY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CLUBFAMILY):
      return {
        ...state,
        errResponse: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_CLUBFAMILY):
    case REQUEST(ACTION_TYPES.UPDATE_CLUBFAMILY):
    case REQUEST(ACTION_TYPES.DELETE_CLUBFAMILY):
      return {
        ...state,
        errResponse: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_CLUBFAMILY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CLUBFAMILY):
    case FAILURE(ACTION_TYPES.CREATE_CLUBFAMILY):
    case FAILURE(ACTION_TYPES.UPDATE_CLUBFAMILY):
    case FAILURE(ACTION_TYPES.DELETE_CLUBFAMILY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errResponse: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CLUBFAMILY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CLUBFAMILY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_CLUBFAMILY):
    case SUCCESS(ACTION_TYPES.UPDATE_CLUBFAMILY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_CLUBFAMILY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.SET_BLOB:
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType,
        },
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/club-families';

// Actions

export const getEntities: ICrudGetAllAction<IClubFamily> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CLUBFAMILY_LIST,
  payload: axios.get<IClubFamily>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IClubFamily> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CLUBFAMILY,
    payload: axios.get<IClubFamily>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IClubFamily> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CLUBFAMILY,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IClubFamily> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CLUBFAMILY,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IClubFamily> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CLUBFAMILY,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name: any, data: any, contentType?: any) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType,
  },
});

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
