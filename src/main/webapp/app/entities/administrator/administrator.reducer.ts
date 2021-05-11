import axios, { AxiosError } from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAdministrator, defaultValue } from 'app/shared/model/administrator.model';
import { AnyAction } from 'redux';

export const ACTION_TYPES = {
  FETCH_ADMINISTRATOR_LIST: 'administrator/FETCH_ADMINISTRATOR_LIST',
  FETCH_ADMINISTRATOR: 'administrator/FETCH_ADMINISTRATOR',
  CREATE_ADMINISTRATOR: 'administrator/CREATE_ADMINISTRATOR',
  UPDATE_ADMINISTRATOR: 'administrator/UPDATE_ADMINISTRATOR',
  DELETE_ADMINISTRATOR: 'administrator/DELETE_ADMINISTRATOR',
  RESET: 'administrator/RESET',
};

const initialState: IAdministratorState = {
  loading: false,
  errResponse: null,
  entities: [] as ReadonlyArray<IAdministrator>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export interface IAdministratorState {
  loading: boolean;
  errResponse: null | AxiosError;
  entities: ReadonlyArray<IAdministrator>;
  entity: Readonly<IAdministrator>;
  updating: boolean;
  updateSuccess: boolean;
}

// Reducer

export default (state: IAdministratorState = initialState, action: AnyAction): IAdministratorState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ADMINISTRATOR_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ADMINISTRATOR):
      return {
        ...state,
        errResponse: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_ADMINISTRATOR):
    case REQUEST(ACTION_TYPES.UPDATE_ADMINISTRATOR):
    case REQUEST(ACTION_TYPES.DELETE_ADMINISTRATOR):
      return {
        ...state,
        errResponse: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_ADMINISTRATOR_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ADMINISTRATOR):
    case FAILURE(ACTION_TYPES.CREATE_ADMINISTRATOR):
    case FAILURE(ACTION_TYPES.UPDATE_ADMINISTRATOR):
    case FAILURE(ACTION_TYPES.DELETE_ADMINISTRATOR):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errResponse: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ADMINISTRATOR_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ADMINISTRATOR):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_ADMINISTRATOR):
    case SUCCESS(ACTION_TYPES.UPDATE_ADMINISTRATOR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_ADMINISTRATOR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/administrators';

// Actions

export const getEntities: ICrudGetAllAction<IAdministrator> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ADMINISTRATOR_LIST,
  payload: axios.get<IAdministrator>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IAdministrator> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ADMINISTRATOR,
    payload: axios.get<IAdministrator>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IAdministrator> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ADMINISTRATOR,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAdministrator> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ADMINISTRATOR,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAdministrator> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ADMINISTRATOR,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
