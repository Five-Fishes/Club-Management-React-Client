export const enum EventCrewRole {
  HEAD = 'HEAD',
  MEMBER = 'MEMBER',
}

export interface IEventCrew {
  id?: number;
  userName?: String;
  userId?: number;
  eventId?: number;
  contactNumber?: String;
  role?: EventCrewRole;
}

export const defaultValue: Readonly<IEventCrew> = {};
