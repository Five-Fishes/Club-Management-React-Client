export const enum ClubFamilyRole {
  FATHER = 'FATHER',
  MOTHER = 'MOTHER',
}

export interface IUserCCInfo {
  id?: number;
  userId?: number;
  clubFamilyId?: number;
  familyRole?: ClubFamilyRole;
  yearSession?: string;
  clubFamilyName?: string;
  fishLevel?: string;
}

export const defaultValue: Readonly<IUserCCInfo> = {};
