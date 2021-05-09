import axios, { AxiosError } from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEvent, defaultValue } from 'app/shared/model/event.model';
import { AnyAction } from 'redux';

export const ACTION_TYPES = {
  FETCH_EVENT_LIST: 'event/FETCH_EVENT_LIST',
  FETCH_EVENT: 'event/FETCH_EVENT',
  CREATE_EVENT: 'event/CREATE_EVENT',
  UPDATE_EVENT: 'event/UPDATE_EVENT',
  DELETE_EVENT: 'event/DELETE_EVENT',
  SET_BLOB: 'event/SET_BLOB',
  RESET: 'event/RESET',
};

const initialState: IEventState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEvent>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export interface IEventState {
  loading: boolean;
  errorMessage: null | AxiosError;
  entities: ReadonlyArray<IEvent>;
  entity: Readonly<IEvent>;
  updating: boolean;
  totalItems: number;
  updateSuccess: boolean;
}

// Reducer

export default (state: IEventState = initialState, action: AnyAction): IEventState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EVENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EVENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_EVENT):
    case REQUEST(ACTION_TYPES.UPDATE_EVENT):
    case REQUEST(ACTION_TYPES.DELETE_EVENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_EVENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EVENT):
    case FAILURE(ACTION_TYPES.CREATE_EVENT):
    case FAILURE(ACTION_TYPES.UPDATE_EVENT):
    case FAILURE(ACTION_TYPES.DELETE_EVENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_EVENT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_EVENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_EVENT):
    case SUCCESS(ACTION_TYPES.UPDATE_EVENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_EVENT):
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

const apiUrl = 'api/events';

export const getUpcomingEntities: ICrudGetAllAction<IEvent> = (page, size, sort) => {
  const requestUrl = `${apiUrl}/upcoming${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_EVENT_LIST,
    payload: axios.get<IEvent>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getPreviousEntities: ICrudGetAllAction<IEvent> = (page, size, sort) => {
  const requestUrl = `${apiUrl}/past${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_EVENT_LIST,
    payload: axios.get<IEvent>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IEvent> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EVENT,
    payload: axios.get<IEvent>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IEvent> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EVENT,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getUpcomingEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEvent> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EVENT,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  dispatch(getUpcomingEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEvent> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EVENT,
    payload: axios.delete(requestUrl),
  });
  dispatch(getUpcomingEntities());
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
