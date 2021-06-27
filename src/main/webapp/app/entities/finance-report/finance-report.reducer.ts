import axios, { AxiosError } from 'axios';
import { ICrudGetAction, ICrudGetAllAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFinanceReport, defaultValue } from 'app/shared/model/finance-report.model';
import { AnyAction } from 'redux';
import { IGetEntityWithoutParams } from 'app/shared/type/custom-action';

export const ACTION_TYPES = {
  FETCH_FULL_FINANCE_REPORT: 'financeReport/FETCH_FULL_FINANCE_REPORT',
  FETCH_FINANCE_REPORT: 'faculty/FETCH_FINANCE_REPORT',
  FETCH_FINANCE_REPORT_STATISTIC: 'faculty/FETCH_FINANCE_REPORT_STATISTIC',
  RESET: 'financeReport/RESET',
};

const initialState: IFinanceReportState = {
  loading: false,
  errResponse: null,
  entities: [] as ReadonlyArray<IFinanceReport>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export interface IFinanceReportState {
  loading: boolean;
  errResponse: null | AxiosError;
  entities: ReadonlyArray<IFinanceReport>;
  entity: Readonly<IFinanceReport>;
  updating: boolean;
  updateSuccess: boolean;
}

// Reducer

export default (state: IFinanceReportState = initialState, action: AnyAction): IFinanceReportState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FULL_FINANCE_REPORT):
      return {
        ...state,
        errResponse: null,
        updateSuccess: false,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_FULL_FINANCE_REPORT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errResponse: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_FULL_FINANCE_REPORT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case REQUEST(ACTION_TYPES.FETCH_FINANCE_REPORT_STATISTIC):
      return {
        ...state,
        errResponse: null,
        updateSuccess: false,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_FINANCE_REPORT_STATISTIC):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errResponse: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_FINANCE_REPORT_STATISTIC):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/finance-report';

// Actions

export const getEntities: ICrudGetAllAction<IFinanceReport> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_FULL_FINANCE_REPORT,
  payload: axios.get<IFinanceReport>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IFinanceReport> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FULL_FINANCE_REPORT,
    payload: axios.get<IFinanceReport>(requestUrl),
  };
};

export const getFinanceReportStatisticOfCurrentYearSession: IGetEntityWithoutParams<IFinanceReport> = () => {
  const requestUrl = `${apiUrl}/current-year-session-statistic`;
  return {
    type: ACTION_TYPES.FETCH_FINANCE_REPORT_STATISTIC,
    payload: axios.get<IFinanceReport>(requestUrl),
  };
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
