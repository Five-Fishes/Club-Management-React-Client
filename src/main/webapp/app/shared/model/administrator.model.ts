export const enum AdministratorRole {
  CC_HEAD = 'CC_HEAD',
  VICE_CC_HEAD = 'VICE_CC_HEAD',
  SECRETARY = 'SECRETARY',
  TEASURER = 'TEASURER',
}

export const enum AdministratorStatus {
  ACTIVE = 'ACTIVE',
  DEACTIVATE = 'DEACTIVATE',
  PENDING = 'PENDING',
}

export interface IAdministrator {
  id?: number;
  userId?: number;
  yearSession?: string;
  role?: AdministratorRole;
  status?: AdministratorStatus;
  firstName?: string;
  lastName?: string;
}

export const defaultValue: Readonly<IAdministrator> = {};
