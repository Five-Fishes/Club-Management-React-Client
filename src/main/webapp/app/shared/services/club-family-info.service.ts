import { IClubFamily } from '../model/club-family.model';

// Properties are set with i18n key so that can toggle value between languages
// Code as Identifies is using exact value
export function getClubFamilyDetails(clubFamilyCode: string): IClubFamily {
  const clubFamilyDetails: IClubFamily = {};
  clubFamilyDetails.code = clubFamilyCode;
  if (clubFamilyCode === 'BI_MU') {
    clubFamilyDetails.name = 'clubmanagementApp.clubFamily.bimu.name';
    clubFamilyDetails.slogan = 'clubmanagementApp.clubFamily.bimu.slogan';
    clubFamilyDetails.description = 'clubmanagementApp.clubFamily.bimu.description';
  } else if (clubFamilyCode === 'JIN_LONG') {
    clubFamilyDetails.name = 'clubmanagementApp.clubFamily.jinlong.name';
    clubFamilyDetails.slogan = 'clubmanagementApp.clubFamily.jinlong.slogan';
    clubFamilyDetails.description = 'clubmanagementApp.clubFamily.jinlong.description';
  } else if (clubFamilyCode === 'KONG_QUE') {
    clubFamilyDetails.name = 'clubmanagementApp.clubFamily.kongque.name';
    clubFamilyDetails.slogan = 'clubmanagementApp.clubFamily.kongque.slogan';
    clubFamilyDetails.description = 'clubmanagementApp.clubFamily.kongque.description';
  } else if (clubFamilyCode === 'QI_CAI') {
    clubFamilyDetails.name = 'clubmanagementApp.clubFamily.qicai.name';
    clubFamilyDetails.slogan = 'clubmanagementApp.clubFamily.qicai.slogan';
    clubFamilyDetails.description = 'clubmanagementApp.clubFamily.qicai.description';
  } else if (clubFamilyCode === 'XIAO_CHOU') {
    clubFamilyDetails.name = 'clubmanagementApp.clubFamily.xiaochou.name';
    clubFamilyDetails.slogan = 'clubmanagementApp.clubFamily.xiaochou.slogan';
    clubFamilyDetails.description = 'clubmanagementApp.clubFamily.xiaochou.description';
  }
  return clubFamilyDetails;
}

export function getClubFamilyList(): IClubFamily[] {
  const biMuFamily: IClubFamily = {
    code: 'BI_MU',
    name: 'clubmanagementApp.clubFamily.bimu.name',
  };
  const jinLongFamily: IClubFamily = {
    code: 'JIN_LONG',
    name: 'clubmanagementApp.clubFamily.jinlong.name',
  };
  const kongQueFamily: IClubFamily = {
    code: 'KONG_QUE',
    name: 'clubmanagementApp.clubFamily.kongque.name',
  };
  const qiCaiFamily: IClubFamily = {
    code: 'QI_CAI',
    name: 'clubmanagementApp.clubFamily.qicai.name',
  };
  const xiaoChouFamily: IClubFamily = {
    code: 'XIAO_CHOU',
    name: 'clubmanagementApp.clubFamily.xiaochou.name',
  };
  return [biMuFamily, jinLongFamily, kongQueFamily, qiCaiFamily, xiaoChouFamily];
}
