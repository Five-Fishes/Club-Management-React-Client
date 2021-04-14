export interface IEventAttendee {
  id?: number;
  userName?: String;
  userId?: number;
  eventId?: number;
  year?: number;
  contactNumber?: String;
  provideTransport?: boolean;
}

export const defaultValue: Readonly<IEventAttendee> = {
  provideTransport: false
};
