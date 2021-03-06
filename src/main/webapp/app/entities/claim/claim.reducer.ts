import axios, { AxiosError } from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IClaim, defaultValue } from 'app/shared/model/claim.model';
import { AnyAction } from 'redux';

export const ACTION_TYPES = {
  FETCH_CLAIM_LIST: 'claim/FETCH_CLAIM_LIST',
  FETCH_CLAIM: 'claim/FETCH_CLAIM',
  CREATE_CLAIM: 'claim/CREATE_CLAIM',
  UPDATE_CLAIM: 'claim/UPDATE_CLAIM',
  DELETE_CLAIM: 'claim/DELETE_CLAIM',
  RESET: 'claim/RESET',
};

const initialState: IClaimState = {
  loading: false,
  errResponse: null,
  entities: [] as ReadonlyArray<IClaim>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export interface IClaimState {
  loading: boolean;
  errResponse: null | AxiosError;
  entities: ReadonlyArray<IClaim>;
  entity: Readonly<IClaim>;
  updating: boolean;
  totalItems: number;
  updateSuccess: boolean;
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
    case REQUEST(ACTION_TYPES.CREATE_CLAIM):
    case REQUEST(ACTION_TYPES.UPDATE_CLAIM):
    case REQUEST(ACTION_TYPES.DELETE_CLAIM):
      return {
        ...state,
        errResponse: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_CLAIM_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CLAIM):
    case FAILURE(ACTION_TYPES.CREATE_CLAIM):
    case FAILURE(ACTION_TYPES.UPDATE_CLAIM):
    case FAILURE(ACTION_TYPES.DELETE_CLAIM):
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
    case SUCCESS(ACTION_TYPES.CREATE_CLAIM):
    case SUCCESS(ACTION_TYPES.UPDATE_CLAIM):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_CLAIM):
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

const apiUrl = 'api/claims';

// Actions

export const getEntities: ICrudGetAllAction<IClaim> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_CLAIM_LIST,
    payload: axios.get<IClaim>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IClaim> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CLAIM,
    payload: axios.get<IClaim>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IClaim> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CLAIM,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IClaim> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CLAIM,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IClaim> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CLAIM,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
