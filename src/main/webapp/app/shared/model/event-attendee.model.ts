export interface IEventAttendee {
  id?: number;
  yearSession?: string;
  userName?: string;
  provideTransport?: boolean;
  contactNumber?: string;
}

export const defaultValue: Readonly<IEventAttendee> = {
  provideTransport: false
};
