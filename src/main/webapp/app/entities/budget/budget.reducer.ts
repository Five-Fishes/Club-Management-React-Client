import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IBudget, defaultValue, IEventBudgetTotal, defaultEventBudgetTotal } from 'app/shared/model/budget.model';
import { IGetAllByEventId } from 'app/shared/type/event-custom-action';

export const ACTION_TYPES = {
  FETCH_BUDGET_LIST: 'budget/FETCH_BUDGET_LIST',
  FETCH_BUDGET: 'budget/FETCH_BUDGET',
  CREATE_BUDGET: 'budget/CREATE_BUDGET',
  UPDATE_BUDGET: 'budget/UPDATE_BUDGET',
  DELETE_BUDGET: 'budget/DELETE_BUDGET',
  SET_BLOB: 'budget/SET_BLOB',
  RESET: 'budget/RESET',
  SET_EVENT_BUDGET_ID: 'budget/SET_EVENT_BUDGET_ID',
  SET_SHOW_ACTION_OPTIONS: 'budget/SET_SHOW_ACTION_OPTIONS',
  FETCH_TOTAL_BUDGET_AMOUNT: 'budget/FETCH_TOTAL_BUDGET_AMOUNT',
  FETCH_TOTAL_REAL_AMOUNT: 'budget/FETCH_TOTAL_REAL_AMOUNT'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IBudget>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
  selectedEventBudgetId: 0,
  showActionOptions: false,
  eventBudgetTotal: defaultEventBudgetTotal,
  eventRealTotal: defaultEventBudgetTotal
};

export type BudgetState = Readonly<typeof initialState>;

// Reducer

export default (state: BudgetState = initialState, action): BudgetState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_BUDGET_LIST):
    case REQUEST(ACTION_TYPES.FETCH_BUDGET):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_BUDGET):
    case REQUEST(ACTION_TYPES.UPDATE_BUDGET):
    case REQUEST(ACTION_TYPES.DELETE_BUDGET):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_BUDGET_LIST):
    case FAILURE(ACTION_TYPES.FETCH_BUDGET):
    case FAILURE(ACTION_TYPES.CREATE_BUDGET):
    case FAILURE(ACTION_TYPES.UPDATE_BUDGET):
    case FAILURE(ACTION_TYPES.DELETE_BUDGET):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_BUDGET_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_BUDGET):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_BUDGET):
    case SUCCESS(ACTION_TYPES.UPDATE_BUDGET):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_BUDGET):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.SET_BLOB:
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType
        }
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    case ACTION_TYPES.SET_EVENT_BUDGET_ID:
      const { eventBudgetId } = action.payload;
      return {
        ...state,
        selectedEventBudgetId: eventBudgetId
      };
    case ACTION_TYPES.SET_SHOW_ACTION_OPTIONS:
      const { show } = action.payload;
      return {
        ...state,
        showActionOptions: show
      };
    case SUCCESS(ACTION_TYPES.FETCH_TOTAL_BUDGET_AMOUNT):
      return {
        ...state,
        eventBudgetTotal: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TOTAL_REAL_AMOUNT):
      return {
        ...state,
        eventRealTotal: action.payload.data
      };
    default:
      return state;
  }
};

const apiUrl = 'api/event-budget';

// Actions

export const getEntities: ICrudGetAllAction<IBudget> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_BUDGET_LIST,
  payload: axios.get<IBudget>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEventBudgetByEventId: IGetAllByEventId<IBudget> = (eventId, page, size, sort) => {
  const requestUrl = `${apiUrl}/event/${eventId}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_BUDGET_LIST,
    payload: axios.get<IBudget>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IBudget> = (id, eventId) => {
  const requestUrl = `${apiUrl}/${id}/event/${eventId}`;
  return {
    type: ACTION_TYPES.FETCH_BUDGET,
    payload: axios.get<IBudget>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IBudget> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_BUDGET,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEventBudgetByEventId(entity.eventId.toString()));
  return result;
};

export const updateEntity: ICrudPutAction<IBudget> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_BUDGET,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IBudget> = (id, eventId) => async dispatch => {
  const requestUrl = `${apiUrl}/${id}/event/${eventId}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_BUDGET,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEventBudgetByEventId(eventId.toString()));
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType
  }
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const setSelectedEventBudgetId = eventBudgetId => ({
  type: ACTION_TYPES.SET_EVENT_BUDGET_ID,
  payload: {
    eventBudgetId
  }
});

export const setShowActionOptions = show => ({
  type: ACTION_TYPES.SET_SHOW_ACTION_OPTIONS,
  payload: {
    show
  }
});

export const getEventBudgetTotal: ICrudGetAction<IEventBudgetTotal> = eventId => {
  const requestUrl = `${apiUrl}/event/${eventId}/total`;
  return {
    type: ACTION_TYPES.FETCH_TOTAL_BUDGET_AMOUNT,
    payload: axios.get<IEventBudgetTotal>(requestUrl)
  };
};

export const getEventRealTotal: ICrudGetAction<IEventBudgetTotal> = eventId => {
  const requestUrl = `api/transactions/event/${eventId}/total`;
  return {
    type: ACTION_TYPES.FETCH_TOTAL_REAL_AMOUNT,
    payload: axios.get<IEventBudgetTotal>(requestUrl)
  };
};
