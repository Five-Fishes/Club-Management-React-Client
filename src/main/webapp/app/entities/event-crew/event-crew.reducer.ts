import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEventCrew, defaultValue } from 'app/shared/model/event-crew.model';
import { IGetAllByEventId } from 'app/shared/type/event-custom-action';

export const ACTION_TYPES = {
  FETCH_EVENTCREW_LIST: 'eventCrew/FETCH_EVENTCREW_LIST',
  FETCH_EVENTCREW: 'eventCrew/FETCH_EVENTCREW',
  CREATE_EVENTCREW: 'eventCrew/CREATE_EVENTCREW',
  UPDATE_EVENTCREW: 'eventCrew/UPDATE_EVENTCREW',
  DELETE_EVENTCREW: 'eventCrew/DELETE_EVENTCREW',
  RESET: 'eventCrew/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEventCrew>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type EventCrewState = Readonly<typeof initialState>;

// Reducer

export default (state: EventCrewState = initialState, action): EventCrewState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EVENTCREW_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EVENTCREW):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_EVENTCREW):
    case REQUEST(ACTION_TYPES.UPDATE_EVENTCREW):
    case REQUEST(ACTION_TYPES.DELETE_EVENTCREW):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_EVENTCREW_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EVENTCREW):
    case FAILURE(ACTION_TYPES.CREATE_EVENTCREW):
    case FAILURE(ACTION_TYPES.UPDATE_EVENTCREW):
    case FAILURE(ACTION_TYPES.DELETE_EVENTCREW):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_EVENTCREW_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_EVENTCREW):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_EVENTCREW):
    case SUCCESS(ACTION_TYPES.UPDATE_EVENTCREW):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_EVENTCREW):
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

const apiUrl = 'api/event-crews';

// Actions

export const getEntities: ICrudGetAllAction<IEventCrew> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_EVENTCREW_LIST,
  payload: axios.get<IEventCrew>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEventCrewByEventId: IGetAllByEventId<IEventCrew> = (eventId, page, size, sort) => {
  const requestUrl = `${apiUrl}/event/${eventId}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_EVENTCREW_LIST,
    payload: axios.get<IEventCrew>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IEventCrew> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EVENTCREW,
    payload: axios.get<IEventCrew>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IEventCrew> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EVENTCREW,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEventCrew> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EVENTCREW,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEventCrew> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EVENTCREW,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
