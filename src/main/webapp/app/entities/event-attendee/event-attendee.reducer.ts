import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEventAttendee, defaultValue } from 'app/shared/model/event-attendee.model';
import { IGetAllByEventId } from 'app/shared/type/event-custom-action';

export const ACTION_TYPES = {
  FETCH_EVENTATTENDEE_LIST: 'eventAttendee/FETCH_EVENTATTENDEE_LIST',
  FETCH_EVENTATTENDEE: 'eventAttendee/FETCH_EVENTATTENDEE',
  CREATE_EVENTATTENDEE: 'eventAttendee/CREATE_EVENTATTENDEE',
  UPDATE_EVENTATTENDEE: 'eventAttendee/UPDATE_EVENTATTENDEE',
  DELETE_EVENTATTENDEE: 'eventAttendee/DELETE_EVENTATTENDEE',
  RESET: 'eventAttendee/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEventAttendee>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type EventAttendeeState = Readonly<typeof initialState>;

// Reducer

export default (state: EventAttendeeState = initialState, action): EventAttendeeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EVENTATTENDEE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EVENTATTENDEE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_EVENTATTENDEE):
    case REQUEST(ACTION_TYPES.UPDATE_EVENTATTENDEE):
    case REQUEST(ACTION_TYPES.DELETE_EVENTATTENDEE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_EVENTATTENDEE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EVENTATTENDEE):
    case FAILURE(ACTION_TYPES.CREATE_EVENTATTENDEE):
    case FAILURE(ACTION_TYPES.UPDATE_EVENTATTENDEE):
    case FAILURE(ACTION_TYPES.DELETE_EVENTATTENDEE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_EVENTATTENDEE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_EVENTATTENDEE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_EVENTATTENDEE):
    case SUCCESS(ACTION_TYPES.UPDATE_EVENTATTENDEE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_EVENTATTENDEE):
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

const apiUrl = 'api/event-attendees';

// Actions

export const getEventAttendeeEntities: IGetAllByEventId<IEventAttendee> = (eventId, page, size, sort) => {
  const requestUrl = `${apiUrl}/event/${eventId}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_EVENTATTENDEE_LIST,
    payload: axios.get<IEventAttendee>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntities: ICrudGetAllAction<IEventAttendee> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_EVENTATTENDEE_LIST,
    payload: axios.get<IEventAttendee>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IEventAttendee> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EVENTATTENDEE,
    payload: axios.get<IEventAttendee>(requestUrl)
  };
};

export const getEntityByEventIdAndUserId = (eventId, userId) => {
  const requestUrl = `${apiUrl}/event/${eventId}/user/${userId}`;
  return {
    type: ACTION_TYPES.FETCH_EVENTATTENDEE,
    payload: axios.get<IEventAttendee>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IEventAttendee> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EVENTATTENDEE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEventAttendee> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EVENTATTENDEE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEventAttendee> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EVENTATTENDEE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
