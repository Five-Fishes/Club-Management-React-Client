import axios, { AxiosError } from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEventChecklist, defaultValue } from 'app/shared/model/event-checklist.model';
import { IGetAllByEventId } from 'app/shared/type/event-custom-action';
import { AnyAction } from 'redux';

export const ACTION_TYPES = {
  FETCH_EVENTCHECKLIST_LIST: 'eventChecklist/FETCH_EVENTCHECKLIST_LIST',
  FETCH_EVENTCHECKLIST: 'eventChecklist/FETCH_EVENTCHECKLIST',
  CREATE_EVENTCHECKLIST: 'eventChecklist/CREATE_EVENTCHECKLIST',
  UPDATE_EVENTCHECKLIST: 'eventChecklist/UPDATE_EVENTCHECKLIST',
  DELETE_EVENTCHECKLIST: 'eventChecklist/DELETE_EVENTCHECKLIST',
  SET_BLOB: 'eventChecklist/SET_BLOB',
  RESET: 'eventChecklist/RESET',
  SET_EVENT_CHECKLIST_ID: 'eventChecklist/SET_EVENT_CHECKLIST_ID',
  SET_SHOW_ACTION_OPTIONS: 'eventChecklist/SET_SHOW_ACTION_OPTIONS',
};

const initialState: IEventChecklistState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEventChecklist>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
  selectedEventChecklistId: 0,
  showActionOptions: false,
};

export interface IEventChecklistState {
  loading: boolean;
  errorMessage: null | AxiosError;
  entities: ReadonlyArray<IEventChecklist>;
  entity: Readonly<IEventChecklist>;
  updating: boolean;
  totalItems: number;
  updateSuccess: boolean;
  selectedEventChecklistId: number;
  showActionOptions: boolean;
}

// Reducer

export default (state: IEventChecklistState = initialState, action: AnyAction): IEventChecklistState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EVENTCHECKLIST_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EVENTCHECKLIST):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_EVENTCHECKLIST):
    case REQUEST(ACTION_TYPES.UPDATE_EVENTCHECKLIST):
    case REQUEST(ACTION_TYPES.DELETE_EVENTCHECKLIST):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_EVENTCHECKLIST_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EVENTCHECKLIST):
    case FAILURE(ACTION_TYPES.CREATE_EVENTCHECKLIST):
    case FAILURE(ACTION_TYPES.UPDATE_EVENTCHECKLIST):
    case FAILURE(ACTION_TYPES.DELETE_EVENTCHECKLIST):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_EVENTCHECKLIST_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_EVENTCHECKLIST):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_EVENTCHECKLIST):
    case SUCCESS(ACTION_TYPES.UPDATE_EVENTCHECKLIST):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_EVENTCHECKLIST):
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
    case ACTION_TYPES.SET_EVENT_CHECKLIST_ID:
      const { eventChecklistId } = action.payload;
      return {
        ...state,
        selectedEventChecklistId: eventChecklistId,
      };
    case ACTION_TYPES.SET_SHOW_ACTION_OPTIONS:
      const { show } = action.payload;
      return {
        ...state,
        showActionOptions: show,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/event-checklists';

// Actions

export const getEntities: ICrudGetAllAction<IEventChecklist> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_EVENTCHECKLIST_LIST,
    payload: axios.get<IEventChecklist>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getChecklistsByEventId: IGetAllByEventId<IEventChecklist> = (eventId, page, size, sort) => {
  const requestUrl = `${apiUrl}/event/${eventId}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_EVENTCHECKLIST_LIST,
    payload: axios.get<IEventChecklist>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IEventChecklist> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EVENTCHECKLIST,
    payload: axios.get<IEventChecklist>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IEventChecklist> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EVENTCHECKLIST,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getChecklistsByEventId(entity ? `${entity.eventId}` : ''));
  return result;
};

export const updateEntity: ICrudPutAction<IEventChecklist> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EVENTCHECKLIST,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  dispatch(getChecklistsByEventId(entity ? `${entity.eventId}` : ''));
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEventChecklist> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EVENTCHECKLIST,
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

export const setSelectedEventChecklistId = (eventChecklistId: number) => ({
  type: ACTION_TYPES.SET_EVENT_CHECKLIST_ID,
  payload: {
    eventChecklistId,
  },
});

export const setShowActionOptions = (show: boolean) => ({
  type: ACTION_TYPES.SET_SHOW_ACTION_OPTIONS,
  payload: {
    show,
  },
});
