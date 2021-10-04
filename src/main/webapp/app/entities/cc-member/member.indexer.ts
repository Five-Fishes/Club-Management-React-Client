import { IUserCCInfo } from 'app/shared/model/user-cc-info.model';

export const genereateIndex = (userCCInfo: IUserCCInfo) => {
  const searchIndex = (userCCInfo.user?.firstName?.trim() || '') + (userCCInfo.user?.lastName?.trim() || '');
  return searchIndex.replace(/\s+/g, '').toLowerCase();
};
