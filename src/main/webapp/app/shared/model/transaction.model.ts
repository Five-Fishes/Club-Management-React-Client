import { Moment } from 'moment';

export const enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE'
}

export interface ITransaction {
  id?: number;
  eventId?: number;
  receiptId?: number;
  type?: TransactionType;
  amount?: number;
  details?: string;
  receiptUrl?: string;
  fileName?: string;
  fileType?: string;
  createdBy?: string;
  createdDate?: Moment;
}

export const defaultValue: Readonly<ITransaction> = {};
