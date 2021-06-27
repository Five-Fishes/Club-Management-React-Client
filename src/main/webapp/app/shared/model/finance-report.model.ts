export interface IFinanceReport {
  id?: number;
  name?: string;
  shortName?: string;
  realiseExpense?: number;
  realiseIncome?: number;
  pendingExpense?: number;
  pendingIncome?: number;
  invalidExpense?: number;
  badDebt?: number;
}

export const defaultValue: Readonly<IFinanceReport> = {};
