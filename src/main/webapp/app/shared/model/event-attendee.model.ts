export interface IEventAttendee {
  id?: number;
  userName?: string;
  contactNumber?: string;
  yearSession?: string;
  provideTransport?: boolean;
}

export const defaultValue: Readonly<IEventAttendee> = {
  provideTransport: false
};
