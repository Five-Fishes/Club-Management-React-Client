export interface IFinanceReportStatistic {
  realiseExpense?: bigint;
  realiseIncome?: bigint;
  pendingExpense?: bigint;
  pendingIncome?: bigint;
  invalidExpense?: bigint;
  badDebt?: bigint;
}

export const defaultValue: Readonly<IFinanceReportStatistic> = {};
