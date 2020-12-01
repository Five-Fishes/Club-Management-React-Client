export const enum EventCrewRole {
  HEAD = 'HEAD'
}

export interface IEventCrew {
  id?: number;
  userId?: number;
  eventId?: number;
  role?: EventCrewRole;
}

export const defaultValue: Readonly<IEventCrew> = {};
