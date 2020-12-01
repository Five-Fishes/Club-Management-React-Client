export const enum DebtStatus {
  OPEN = 'OPEN',
  COLLECTED = 'COLLECTED',
  UNREACHABLE = 'UNREACHABLE'
}

export interface IDebt {
  id?: number;
  receiptId?: number;
  eventAttendeeId?: number;
  amount?: number;
  status?: DebtStatus;
  receiptUrl?: string;
  fileName?: string;
  fileType?: string;
}

export const defaultValue: Readonly<IDebt> = {};
