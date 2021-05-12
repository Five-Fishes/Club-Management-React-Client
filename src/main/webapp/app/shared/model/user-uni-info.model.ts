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
  id: null,
  userId: null,
  faculty: '',
  program: '',
  yearSession: '',
  intakeSemester: null,
  yearOfStudy: null,
  stayIn: '',
  status: null,
  firstName: '',
  lastName: '',
  email: '',
  gender: '',
  phoneNumber: '',
  imageUrl: '',
  dateOfBirth: null,
  clubFamilyId: null,
  clubFamilyName: '',
  clubFamilySlogan: '',
  clubFamilyDescription: '',
};
