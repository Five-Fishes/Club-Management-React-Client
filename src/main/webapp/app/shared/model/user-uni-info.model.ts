import { Moment } from 'moment';

export const enum UserUniStatus {
  GRADUATED = 'GRADUATED',
  STUDYING = 'STUDYING',
  EXTENDED = 'EXTENDED',
  TRANSFERRED = 'TRANSFERRED',
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
  email?: string;
  gender?: string;
  phoneNumber?: string;
  imageUrl?: string;
  dateOfBirth?: Moment;
  clubFamilyId?: number;
  clubFamilyName?: string;
  clubFamilySlogan?: string;
  clubFamilyDescription?: string;
}

export const defaultValue: Readonly<IUserUniInfo> = {
  id: undefined,
  userId: undefined,
  faculty: '',
  program: '',
  yearSession: '',
  intakeSemester: undefined,
  yearOfStudy: undefined,
  stayIn: '',
  status: undefined,
  firstName: '',
  lastName: '',
  email: '',
  gender: '',
  phoneNumber: '',
  imageUrl: '',
  dateOfBirth: undefined,
  clubFamilyId: undefined,
  clubFamilyName: '',
  clubFamilySlogan: '',
  clubFamilyDescription: '',
};
