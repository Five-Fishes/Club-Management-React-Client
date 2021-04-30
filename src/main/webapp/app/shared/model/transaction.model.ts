import { Moment } from 'moment';

export const enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE'
}

export const enum TransactionStatus {
  COLLECTED = 'COLLECTED',
  PENDING = 'PENDING'
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
  status?: TransactionStatus;
}

export const defaultValue: Readonly<ITransaction> = {};
