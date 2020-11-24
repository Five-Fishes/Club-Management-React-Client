export interface IEventAttendee {
  id?: number;
  userId?: number;
  eventId?: number;
  provideTransport?: boolean;
}

export const defaultValue: Readonly<IEventAttendee> = {
  provideTransport: false
};
