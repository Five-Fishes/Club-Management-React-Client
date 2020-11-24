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
