export const enum ClaimStatus {
  OPEN = 'OPEN',
  CLAIMED = 'CLAIMED',
  SUSPENDED = 'SUSPENDED',
  EXPIRED = 'EXPIRED'
}

export interface IClaim {
  id?: number;
  receiptId?: number;
  transactionId?: number;
  amount?: number;
  status?: ClaimStatus;
  receiptUrl?: string;
  fileName?: string;
  fileType?: string;
}

export const defaultValue: Readonly<IClaim> = {};
