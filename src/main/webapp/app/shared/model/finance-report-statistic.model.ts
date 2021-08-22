export interface IFinanceReportStatistic {
  realiseExpense?: number;
  realiseIncome?: number;
  pendingExpense?: number;
  pendingIncome?: number;
  invalidExpense?: number;
  badDebt?: number;
}

export const defaultValue: Readonly<IFinanceReportStatistic> = {};
