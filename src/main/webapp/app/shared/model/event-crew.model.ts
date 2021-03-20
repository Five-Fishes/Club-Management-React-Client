export const enum EventCrewRole {
  HEAD = 'HEAD'
}

export interface IEventCrew {
  id?: number;
  name?: String;
  userId?: number;
  eventId?: number;
  contactNumber?: String;
  role?: EventCrewRole;
}

export const defaultValue: Readonly<IEventCrew> = {};
