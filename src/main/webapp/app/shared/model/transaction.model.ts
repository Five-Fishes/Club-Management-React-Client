import { Moment } from 'moment';

export const enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export const enum TransactionStatus {
  COMPLETED = 'COMPLETED',
  INVALID = 'INVALID',
  PENDING = 'PENDING',
}

export interface ITransaction {
  id?: number;
  eventId?: number;
  transactionType?: TransactionType;
  transactionAmount?: number;
  description?: string;
  transactionStatus?: TransactionStatus;
  createdBy?: string;
  createdDate?: Moment;
  closedBy?: string;
  title?: string;
  imageLink?: string;
  transactionDate?: Moment;
  multipartFile?: File;
}

export const defaultValue: Readonly<ITransaction> = {};
