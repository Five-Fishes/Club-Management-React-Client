import { Moment } from 'moment';
import { DebtStatus } from 'app/shared/model/debt.model';

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
  title?: string;
  eventId?: number;
  eventName?: string;
  receiptId?: number;
  transactionType?: TransactionType;
  transactionAmount?: number;
  description?: string;
  imageLink?: string;
  transactionStatus?: TransactionStatus;
  receiptUrl?: string;
  fileName?: string;
  fileType?: string;
  createdBy?: string;
  belongsTo?: string;
  createdDate?: Moment;
  lastModifiedBy?: string;
  lastModifiedDate?: Moment;
  transactionDate?: Moment;
  closedBy?: string;
  multipartFile?: File;
}

export const defaultValue: Readonly<ITransaction> = {};
