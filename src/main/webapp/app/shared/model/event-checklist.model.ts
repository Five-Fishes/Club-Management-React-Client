export const enum EventChecklistStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED'
}

export const enum EventChecklistType {
  PREPARATION = 'PREPARATION',
  PURCHASE = 'PURCHASE'
}

export interface IEventChecklist {
  id?: number;
  eventId?: number;
  name?: string;
  description?: any;
  status?: EventChecklistStatus;
  type?: EventChecklistType;
}

export const defaultValue: Readonly<IEventChecklist> = {};
