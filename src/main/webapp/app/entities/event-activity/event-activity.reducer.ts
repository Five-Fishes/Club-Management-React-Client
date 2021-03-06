import axios, { AxiosAdapter, AxiosError } from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEventActivity, defaultValue } from 'app/shared/model/event-activity.model';
import { IGetActionWithEventId, IGetAllByEventId, IDeleteActionWithEventId } from 'app/shared/type/event-custom-action';
import { AnyAction } from 'redux';

export const ACTION_TYPES = {
  FETCH_EVENTACTIVITY_LIST: 'eventActivity/FETCH_EVENTACTIVITY_LIST',
  FETCH_EVENTACTIVITY: 'eventActivity/FETCH_EVENTACTIVITY',
  CREATE_EVENTACTIVITY: 'eventActivity/CREATE_EVENTACTIVITY',
  UPDATE_EVENTACTIVITY: 'eventActivity/UPDATE_EVENTACTIVITY',
  DELETE_EVENTACTIVITY: 'eventActivity/DELETE_EVENTACTIVITY',
  SET_BLOB: 'eventActivity/SET_BLOB',
  RESET: 'eventActivity/RESET',
  SET_EVENT_ACTIVITY_ID: 'SET_EVENT_ACTIVITY_ID',
  SET_SHOW_ACTION_OPTIONS: 'SET_SHOW_ACTION_OPTIONS',
};

const initialState: IEventActivityState = {
  loading: false,
  errResponse: null,
  entities: [] as IEventActivity[],
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
  selectedEventActivityId: 0,
  showActionOptions: false,
};

export interface IEventActivityState {
  loading: boolean;
  errResponse: null | AxiosError;
  entities: ReadonlyArray<IEventActivity>;
  entity: Readonly<IEventActivity>;
  updating: boolean;
  totalItems: number;
  updateSuccess: boolean;
  selectedEventActivityId: number;
  showActionOptions: boolean;
}

// Reducer

export default (state: IEventActivityState = initialState, action: AnyAction): IEventActivityState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EVENTACTIVITY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EVENTACTIVITY):
      return {
        ...state,
        errResponse: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_EVENTACTIVITY):
    case REQUEST(ACTION_TYPES.UPDATE_EVENTACTIVITY):
    case REQUEST(ACTION_TYPES.DELETE_EVENTACTIVITY):
      return {
        ...state,
        errResponse: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_EVENTACTIVITY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EVENTACTIVITY):
    case FAILURE(ACTION_TYPES.CREATE_EVENTACTIVITY):
    case FAILURE(ACTION_TYPES.UPDATE_EVENTACTIVITY):
    case FAILURE(ACTION_TYPES.DELETE_EVENTACTIVITY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errResponse: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_EVENTACTIVITY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_EVENTACTIVITY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_EVENTACTIVITY):
    case SUCCESS(ACTION_TYPES.UPDATE_EVENTACTIVITY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_EVENTACTIVITY):
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
    case ACTION_TYPES.SET_EVENT_ACTIVITY_ID:
      const { eventActivityId } = action.payload;
      return {
        ...state,
        selectedEventActivityId: eventActivityId,
      };
    case ACTION_TYPES.SET_SHOW_ACTION_OPTIONS:
      const { show } = action.payload;
      return {
        ...state,
        showActionOptions: show,
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/event-activities';

// Actions

export const getEntities: ICrudGetAllAction<IEventActivity> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_EVENTACTIVITY_LIST,
    payload: axios.get<IEventActivity>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEventActivitiesByEventId: IGetAllByEventId<IEventActivity> = (eventId, page, size, sort) => {
  const requestUrl = `${apiUrl}/event/${eventId}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_EVENTACTIVITY_LIST,
    payload: axios.get<IEventActivity>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: IGetActionWithEventId<IEventActivity> = (id, eventId) => {
  const requestUrl = `${apiUrl}/${id}/event/${eventId}`;
  return {
    type: ACTION_TYPES.FETCH_EVENTACTIVITY,
    payload: axios.get<IEventActivity>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IEventActivity> = entity => async dispatch => {
  if (!entity) return;
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EVENTACTIVITY,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEventActivitiesByEventId(entity.eventId));
  return result;
};

export const updateEntity: ICrudPutAction<IEventActivity> = entity => async dispatch => {
  if (!entity) return;
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EVENTACTIVITY,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEventActivitiesByEventId(entity.eventId));
  return result;
};

export const deleteEntity: IDeleteActionWithEventId<IEventActivity> = (id, eventId) => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EVENTACTIVITY,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEventActivitiesByEventId(eventId as number));
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

export const setSelectedEventActivityId = (eventActivityId: number) => ({
  type: ACTION_TYPES.SET_EVENT_ACTIVITY_ID,
  payload: {
    eventActivityId,
  },
});

export const setShowActionOptions = (show: boolean) => ({
  type: ACTION_TYPES.SET_SHOW_ACTION_OPTIONS,
  payload: {
    show,
  },
});

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
