import axios, { AxiosError } from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { AnyAction } from 'redux';
import { ITransaction, defaultValue } from 'app/shared/model/transaction.model';

export const ACTION_TYPES = {
  FETCH_CLAIM_LIST: 'claim/FETCH_CLAIM_LIST',
  FETCH_CLAIM: 'claim/FETCH_CLAIM',
  UPDATE_CLAIM: 'claim/UPDATE_CLAIM',
  UPDATE_CLAIM_STATUS: 'claim/UPDATE_CLAIM',
  RESET: 'claim/RESET',
  SET_CLAIM_ID: 'claim/SET_CLAIM_ID',
  SET_CLAIM: 'claim/SET_CLAIM',
  SET_SHOW_TRANSACTION_DETAILS_DIALOG: 'claim/SET_SHOW_TRANSACTION_DETAILS_DIALOG',
  SET_SHOW_PAY_DIALOG: 'claim/SET_SHOW_PAY_DIALOG',
  SET_SHOW_DISMISS_DIALOG: 'claim/SET_SHOW_DISMISS_DIALOG',
};

const initialState: IClaimState = {
  loading: false,
  errResponse: null,
  entities: [] as ReadonlyArray<ITransaction>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
  selectedClaimId: 0,
  selectedClaim: defaultValue,
  showTransactionDetailsDialog: false,
  showPayDialog: false,
  showDismissDialog: false,
};

export interface IClaimState {
  loading: boolean;
  errResponse: null | AxiosError;
  entities: ReadonlyArray<ITransaction>;
  entity: Readonly<ITransaction>;
  updating: boolean;
  totalItems: number;
  updateSuccess: boolean;
  selectedClaimId: number;
  selectedClaim: ITransaction;
  showTransactionDetailsDialog: boolean;
  showPayDialog: boolean;
  showDismissDialog: boolean;
}

// Reducer

export default (state: IClaimState = initialState, action: AnyAction): IClaimState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CLAIM_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CLAIM):
      return {
        ...state,
        errResponse: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.UPDATE_CLAIM):
    case REQUEST(ACTION_TYPES.UPDATE_CLAIM_STATUS):
      return {
        ...state,
        errResponse: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_CLAIM_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CLAIM):
    case FAILURE(ACTION_TYPES.UPDATE_CLAIM):
    case FAILURE(ACTION_TYPES.UPDATE_CLAIM_STATUS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errResponse: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CLAIM_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_CLAIM):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.UPDATE_CLAIM):
    case SUCCESS(ACTION_TYPES.UPDATE_CLAIM_STATUS):
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
    case ACTION_TYPES.SET_CLAIM_ID:
      const { claimId } = action.payload;
      return {
        ...state,
        selectedClaimId: claimId,
      };
    case ACTION_TYPES.SET_CLAIM:
      const { claim } = action.payload;
      return {
        ...state,
        selectedClaim: claim,
      };
    case ACTION_TYPES.SET_SHOW_TRANSACTION_DETAILS_DIALOG:
      const { show } = action.payload;
      return {
        ...state,
        showTransactionDetailsDialog: show,
      };
    case ACTION_TYPES.SET_SHOW_PAY_DIALOG:
      const { showPay } = action.payload;
      return {
        ...state,
        showPayDialog: showPay,
      };
    case ACTION_TYPES.SET_SHOW_DISMISS_DIALOG:
      const { showDismiss } = action.payload;
      return {
        ...state,
        showDismissDialog: showDismiss,
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
    type: ACTION_TYPES.FETCH_CLAIM_LIST,
    payload: axios.get<ITransaction>(
      `${requestUrl}${sort ? '&' : '?'}transactionType.equals=EXPENSE&transactionStatus.equals=PENDING&cacheBuster=${new Date().getTime()}`
    ),
  };
};

export const getEntity: ICrudGetAction<ITransaction> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CLAIM,
    payload: axios.get<ITransaction>(requestUrl),
  };
};

export const updateEntityStatus = (id: number, status: any) => async (dispatch: any) => {
  const requestUrl = `${apiUrl}/${id}/status/${status}`;
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CLAIM_STATUS,
    payload: axios.put(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITransaction> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CLAIM,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});

export const setSelectedClaimId = (claimId: number) => ({
  type: ACTION_TYPES.SET_CLAIM_ID,
  payload: {
    claimId,
  },
});

export const setSelectedClaim = (claim: ITransaction) => ({
  type: ACTION_TYPES.SET_CLAIM,
  payload: {
    claim,
  },
});

export const setShowTransactionDetailsDialog = (show: boolean) => ({
  type: ACTION_TYPES.SET_SHOW_TRANSACTION_DETAILS_DIALOG,
  payload: {
    show,
  },
});

export const setShowPayDialog = (showPay: boolean) => ({
  type: ACTION_TYPES.SET_SHOW_PAY_DIALOG,
  payload: {
    showPay,
  },
});

export const setShowDismissDialog = (showDismiss: boolean) => ({
  type: ACTION_TYPES.SET_SHOW_DISMISS_DIALOG,
  payload: {
    showDismiss,
  },
});
