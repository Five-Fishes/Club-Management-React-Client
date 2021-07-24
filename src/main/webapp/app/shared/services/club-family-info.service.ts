import { IClubFamily } from '../model/club-family.model';

export function getClubFamilyDetails(clubFamilyCode: string): IClubFamily {
  const clubFamilyDetails: IClubFamily = {};
  clubFamilyDetails.code = clubFamilyCode;
  if (clubFamilyCode === 'BI_MU') {
    clubFamilyDetails.name = 'Bi Mu';
    clubFamilyDetails.slogan = 'Bi Mu Bi Mu, No Dumb than you';
    clubFamilyDetails.description = 'Bi Mu Family is famous for its smart and interesting fishes';
  } else if (clubFamilyCode === 'JIN_LONG') {
    clubFamilyDetails.name = 'Jin Long';
    clubFamilyDetails.slogan = 'Jin Long Spirit, Leng Zai Leng Nui';
    clubFamilyDetails.description = 'Jin Long Family is famous for its Leng Zai Leng lui';
  } else if (clubFamilyCode === 'KONG_QUE') {
    clubFamilyDetails.name = 'Kong Que';
    clubFamilyDetails.slogan = 'We are better than the best among the best of the best';
    clubFamilyDetails.description = 'Peacock Family Fishes are the best of the best';
  } else if (clubFamilyCode === 'QI_CAI') {
    clubFamilyDetails.name = 'Qi Cai';
    clubFamilyDetails.slogan = 'Qi Cai Qi Cai, Step on You';
    clubFamilyDetails.description = 'Qi Cai Family Fishes are friendly and truth personality';
  } else if (clubFamilyCode === 'XIAO_CHOU') {
    clubFamilyDetails.name = 'Xiao Chou';
    clubFamilyDetails.slogan = 'Nemo Nemo, No More Emo';
    clubFamilyDetails.description = 'Nemo Family Fishes always full with positive energy and make you away from Emo';
  }
  return clubFamilyDetails;
}
