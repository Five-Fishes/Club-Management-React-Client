export interface IEventAttendee {
  id?: number;
  year?: string;
  userName?: string;
  provideTransport?: boolean;
  contactNumber?: string;
}

export const defaultValue: Readonly<IEventAttendee> = {
  provideTransport: false
};
