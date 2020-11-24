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
}

export const defaultValue: Readonly<IUserUniInfo> = {};
