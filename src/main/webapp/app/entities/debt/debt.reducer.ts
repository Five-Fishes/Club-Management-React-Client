import axios, { AxiosError } from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITransaction, defaultValue } from 'app/shared/model/transaction.model';
import { AnyAction } from 'redux';

export const ACTION_TYPES = {
  FETCH_DEBT_LIST: 'debt/FETCH_DEBT_LIST',
  FETCH_DEBT: 'debt/FETCH_DEBT',
  UPDATE_DEBT: 'debt/UPDATE_DEBT',
  UPDATE_DEBT_STATUS: 'debt/UPDATE_DEBT_STATUS',
  RESET: 'debt/RESET',
  SET_DEBT_ID: 'debt/SET_DEBT_ID',
  SET_DEBT: 'debt/SET_DEBT',
  SET_SHOW_TRANSACTION_DETAILS_DIALOG: 'debt/SET_SHOW_TRANSACTION_DETAILS_DIALOG',
  SET_SHOW_COLLECT_DIALOG: 'debt/SET_SHOW_COLLECT_DIALOG',
  SET_SHOW_BAD_DEBT_DIALOG: 'debt/SET_SHOW_BAD_DEBT_DIALOG',
};

const initialState: IDebtState = {
  loading: false,
  errResponse: null,
  entities: [] as ReadonlyArray<ITransaction>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
  selectedDebtId: 0,
  selectedDebt: defaultValue,
  showTransactionDetailsDialog: false,
  showCollectDialog: false,
  showBadDebtDialog: false,
};

export interface IDebtState {
  loading: boolean;
  errResponse: null | AxiosError;
  entities: ReadonlyArray<ITransaction>;
  entity: Readonly<ITransaction>;
  updating: boolean;
  totalItems: number;
  updateSuccess: boolean;
  selectedDebtId: number;
  selectedDebt: ITransaction;
  showTransactionDetailsDialog: boolean;
  showCollectDialog: boolean;
  showBadDebtDialog: boolean;
}

// Reducer

export default (state: IDebtState = initialState, action: AnyAction): IDebtState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DEBT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DEBT):
      return {
        ...state,
        errResponse: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.UPDATE_DEBT):
    case REQUEST(ACTION_TYPES.UPDATE_DEBT_STATUS):
      return {
        ...state,
        errResponse: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_DEBT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DEBT):
    case FAILURE(ACTION_TYPES.UPDATE_DEBT):
    case FAILURE(ACTION_TYPES.UPDATE_DEBT_STATUS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errResponse: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_DEBT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_DEBT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.UPDATE_DEBT):
    case SUCCESS(ACTION_TYPES.UPDATE_DEBT_STATUS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    case ACTION_TYPES.SET_DEBT_ID:
      const { debtId } = action.payload;
      return {
        ...state,
        selectedDebtId: debtId,
      };
    case ACTION_TYPES.SET_DEBT:
      const { debt } = action.payload;
      return {
        ...state,
        selectedDebt: debt,
      };
    case ACTION_TYPES.SET_SHOW_TRANSACTION_DETAILS_DIALOG:
      const { show } = action.payload;
      return {
        ...state,
        showTransactionDetailsDialog: show,
      };
    case ACTION_TYPES.SET_SHOW_COLLECT_DIALOG:
      const { showCollect } = action.payload;
      return {
        ...state,
        showCollectDialog: showCollect,
      };
    case ACTION_TYPES.SET_SHOW_BAD_DEBT_DIALOG:
      const { showBadDebt } = action.payload;
      return {
        ...state,
        showBadDebtDialog: showBadDebt,
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
    type: ACTION_TYPES.FETCH_DEBT_LIST,
    payload: axios.get<ITransaction>(
      `${requestUrl}${sort ? '&' : '?'}transactionType.equals=INCOME&transactionStatus.equals=PENDING&cacheBuster=${new Date().getTime()}`
    ),
  };
};

export const getEntity: ICrudGetAction<ITransaction> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DEBT,
    payload: axios.get<ITransaction>(requestUrl),
  };
};

export const updateEntityStatus = (id: number, status: any) => async (dispatch: any) => {
  const requestUrl = `${apiUrl}/${id}/status/${status}`;
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DEBT_STATUS,
    payload: axios.put(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITransaction> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DEBT,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});

export const setSelectedDebtId = (debtId: number) => ({
  type: ACTION_TYPES.SET_DEBT_ID,
  payload: {
    debtId,
  },
});

export const setSelectedDebt = (debt: ITransaction) => ({
  type: ACTION_TYPES.SET_DEBT,
  payload: {
    debt,
  },
});

export const setShowTransactionDetailsDialog = (show: boolean) => ({
  type: ACTION_TYPES.SET_SHOW_TRANSACTION_DETAILS_DIALOG,
  payload: {
    show,
  },
});

export const setShowCollectDialog = (showCollect: boolean) => ({
  type: ACTION_TYPES.SET_SHOW_COLLECT_DIALOG,
  payload: {
    showCollect,
  },
});

export const setShowBadDebtDialog = (showBadDebt: boolean) => ({
  type: ACTION_TYPES.SET_SHOW_BAD_DEBT_DIALOG,
  payload: {
    showBadDebt,
  },
});
