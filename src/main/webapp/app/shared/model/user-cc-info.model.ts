import { IUser } from './user.model';

export const enum ClubFamilyRole {
  FATHER = 'FATHER',
  MOTHER = 'MOTHER',
}

export interface IUserCCInfo {
  id?: number;
  userId?: number;
  clubFamilyCode?: number | string;
  familyRole?: ClubFamilyRole;
  yearSession?: string;
  fishLevel?: string;
  clubFamilyName?: string;
  clubFamilySlogan?: string;
  user?: IUser;
}

export const defaultValue: Readonly<IUserCCInfo> = {};
