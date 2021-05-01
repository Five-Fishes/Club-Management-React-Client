import { Moment } from 'moment';

export const enum UserUniStatus {
  GRADUATED = 'GRADUATED',
  STUDYING = 'STUDYING',
  EXTENDED = 'EXTENDED',
  TRANSFERRED = 'TRANSFERRED'
}

export interface IUserUniInfo {
  id?: number;
  userId?: number;
  faculty?: string;
  program?: string;
  yearSession?: string;
  intakeSemester?: number;
  yearOfStudy?: number;
  stayIn?: string;
  status?: UserUniStatus;
  firstName?: string;
  lastName?: string;
  gender?: string;
  phoneNumber?: string;
  imageUrl?: string;
  dateOfBirth?: Moment;
}

export const defaultValue: Readonly<IUserUniInfo> = {};
