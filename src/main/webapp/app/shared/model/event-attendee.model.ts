export interface IEventAttendee {
  id?: number;
  userId?: number;
  eventId?: number;
  userName?: string;
  contactNumber?: string;
  yearSession?: string;
  provideTransport?: boolean;
}

export const defaultValue: Readonly<IEventAttendee> = {
  provideTransport: false,
};
