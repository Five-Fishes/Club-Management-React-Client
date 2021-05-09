import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDebt, defaultValue } from 'app/shared/model/debt.model';

export const ACTION_TYPES = {
  FETCH_DEBT_LIST: 'debt/FETCH_DEBT_LIST',
  FETCH_DEBT: 'debt/FETCH_DEBT',
  CREATE_DEBT: 'debt/CREATE_DEBT',
  UPDATE_DEBT: 'debt/UPDATE_DEBT',
  DELETE_DEBT: 'debt/DELETE_DEBT',
  RESET: 'debt/RESET',
  SET_DEBT_ID: 'debt/SET_DEBT_ID',
  SET_SHOW_ACTION_OPTIONS: 'debt/SET_SHOW_ACTION_OPTIONS',
  SET_SHOW_COLLECT_DIALOG: 'debt/SET_SHOW_COLLECT_DIALOG',
  SET_SHOW_BAD_DEBT_DIALOG: 'debt/SET_SHOW_BAD_DEBT_DIALOG'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDebt>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
  selectedDebtId: 0,
  showActionOptions: false,
  showCollectDialog: false,
  showBadDebtDialog: false
};

export type DebtState = Readonly<typeof initialState>;

// Reducer

export default (state: DebtState = initialState, action): DebtState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DEBT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DEBT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DEBT):
    case REQUEST(ACTION_TYPES.UPDATE_DEBT):
    case REQUEST(ACTION_TYPES.DELETE_DEBT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DEBT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DEBT):
    case FAILURE(ACTION_TYPES.CREATE_DEBT):
    case FAILURE(ACTION_TYPES.UPDATE_DEBT):
    case FAILURE(ACTION_TYPES.DELETE_DEBT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_DEBT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_DEBT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_DEBT):
    case SUCCESS(ACTION_TYPES.UPDATE_DEBT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DEBT):
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
    case ACTION_TYPES.SET_DEBT_ID:
      const { debtId } = action.payload;
      return {
        ...state,
        selectedDebtId: debtId
      };
    case ACTION_TYPES.SET_SHOW_ACTION_OPTIONS:
      const { show } = action.payload;
      return {
        ...state,
        showActionOptions: show
      };
    case ACTION_TYPES.SET_SHOW_COLLECT_DIALOG:
      const { showCollect } = action.payload;
      return {
        ...state,
        showCollectDialog: showCollect
      };
    case ACTION_TYPES.SET_SHOW_BAD_DEBT_DIALOG:
      const { showBadDebt } = action.payload;
      return {
        ...state,
        showBadDebtDialog: showBadDebt
      };
    default:
      return state;
  }
};

const apiUrl = 'api/debts';

// Actions

export const getEntities: ICrudGetAllAction<IDebt> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_DEBT_LIST,
    payload: axios.get<IDebt>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IDebt> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DEBT,
    payload: axios.get<IDebt>(requestUrl)
  };
};

export const updateEntityStatus = (id, status) => async dispatch => {
  const requestUrl = `${apiUrl}/${id}/status/${status}`;
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DEBT,
    payload: axios.put(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const createEntity: ICrudPutAction<IDebt> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DEBT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDebt> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DEBT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDebt> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DEBT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const setSelectedDebtId = debtId => ({
  type: ACTION_TYPES.SET_DEBT_ID,
  payload: {
    debtId
  }
});

export const setShowActionOptions = show => ({
  type: ACTION_TYPES.SET_SHOW_ACTION_OPTIONS,
  payload: {
    show
  }
});

export const setShowCollectDialog = showCollect => ({
  type: ACTION_TYPES.SET_SHOW_COLLECT_DIALOG,
  payload: {
    showCollect
  }
});

export const setShowBadDebtDialog = showBadDebt => ({
  type: ACTION_TYPES.SET_SHOW_BAD_DEBT_DIALOG,
  payload: {
    showBadDebt
  }
});
