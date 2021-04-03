export interface IEventAttendee {
  id?: number;
  userId?: number;
  year?: string;
  userName?: string;
  provideTransport?: boolean;
  contactNumber?: String;
}

export const defaultValue: Readonly<IEventAttendee> = {
  provideTransport: false
};
