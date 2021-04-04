export const enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE'
}

export interface IBudget {
  id?: number;
  eventId?: number;
  amount?: number;
  type?: TransactionType;
  name?: string;
  details?: any;
}

export const defaultValue: Readonly<IBudget> = {};

export interface IEventBudgetTotal {
  totalExpense?: number;
  totalIncome?: number;
}

export const defaultEventBudgetTotal: Readonly<IEventBudgetTotal> = {};
