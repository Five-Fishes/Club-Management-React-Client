import axios, { AxiosError } from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITransaction, defaultValue } from 'app/shared/model/transaction.model';
import { AnyAction } from 'redux';

export const ACTION_TYPES = {
  FETCH_TRANSACTION_LIST: 'transaction/FETCH_TRANSACTION_LIST',
  FETCH_TRANSACTION: 'transaction/FETCH_TRANSACTION',
  CREATE_TRANSACTION: 'transaction/CREATE_TRANSACTION',
  UPDATE_TRANSACTION: 'transaction/UPDATE_TRANSACTION',
  DELETE_TRANSACTION: 'transaction/DELETE_TRANSACTION',
  RESET: 'transaction/RESET',
};

const initialState: ITransactionState = {
  loading: false,
  errResponse: null,
  entities: [] as ReadonlyArray<ITransaction>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export interface ITransactionState {
  loading: boolean;
  errResponse: null | AxiosError;
  entities: ReadonlyArray<ITransaction>;
  entity: Readonly<ITransaction>;
  updating: boolean;
  totalItems: number;
  updateSuccess: boolean;
}

// Reducer

export default (state: ITransactionState = initialState, action: AnyAction): ITransactionState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TRANSACTION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TRANSACTION):
      return {
        ...state,
        errResponse: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_TRANSACTION):
    case REQUEST(ACTION_TYPES.UPDATE_TRANSACTION):
    case REQUEST(ACTION_TYPES.DELETE_TRANSACTION):
      return {
        ...state,
        errResponse: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_TRANSACTION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TRANSACTION):
    case FAILURE(ACTION_TYPES.CREATE_TRANSACTION):
    case FAILURE(ACTION_TYPES.UPDATE_TRANSACTION):
    case FAILURE(ACTION_TYPES.DELETE_TRANSACTION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errResponse: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_TRANSACTION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_TRANSACTION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_TRANSACTION):
    case SUCCESS(ACTION_TYPES.UPDATE_TRANSACTION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_TRANSACTION):
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

const apiUrl = 'api/transactions';

// Actions

export const getEntities: ICrudGetAllAction<ITransaction> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_TRANSACTION_LIST,
    payload: axios.get<ITransaction>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<ITransaction> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TRANSACTION,
    payload: axios.get<ITransaction>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<FormData> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TRANSACTION,
    payload: axios.post(apiUrl, entity),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<FormData> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TRANSACTION,
    payload: axios.put(apiUrl, entity),
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITransaction> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TRANSACTION,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
