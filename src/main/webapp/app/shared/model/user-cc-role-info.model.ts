export enum CCRoleType {
  FAMILY_ROLE,
  EVENT_CREW,
  CC_ADMINISTRATOR,
}

export interface IUserCCRoleInfo {
  userId?: number;
  type?: CCRoleType;
  role?: string;
  yearSession?: string;
  eventId?: number;
  eventName?: string;
}

export const defaultValue: Readonly<IUserCCRoleInfo> = {};
