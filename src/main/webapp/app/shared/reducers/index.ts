import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { IAuthenticationInitialState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { IAdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { IUserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
// prettier-ignore
import event, {
  IEventState
} from 'app/entities/event/event.reducer';
// prettier-ignore
import eventCrew, {
  IEventCrewState
} from 'app/entities/event-crew/event-crew.reducer';
// prettier-ignore
import eventAttendee, {
  IEventAttendeeState
} from 'app/entities/event-attendee/event-attendee.reducer';
// prettier-ignore
import budget, {
  IBudgetState
} from 'app/entities/budget/budget.reducer';
// prettier-ignore
import eventActivity, {
  IEventActivityState
} from 'app/entities/event-activity/event-activity.reducer';
// prettier-ignore
import eventChecklist, {
  IEventChecklistState
} from 'app/entities/event-checklist/event-checklist.reducer';
// prettier-ignore
import transaction, {
  ITransactionState
} from 'app/entities/transaction/transaction.reducer';
// prettier-ignore
import claim, {
  IClaimState
} from 'app/entities/claim/claim.reducer';
// prettier-ignore
import debt, {
  IDebtState
} from 'app/entities/debt/debt.reducer';
// prettier-ignore
import administrator, {
  IAdministratorState
} from 'app/entities/administrator/administrator.reducer';
// prettier-ignore
import clubFamily, {
  IClubFamilyState
} from 'app/entities/club-family/club-family.reducer';
// prettier-ignore
import userCCInfo, {
  IUserCCInfoState
} from 'app/entities/user-cc-info/user-cc-info.reducer';
// prettier-ignore
import userUniInfo, {
  IUserUniInfoState
} from 'app/entities/user-uni-info/user-uni-info.reducer';
// prettier-ignore
import faculty, {
  IFacultyState
} from 'app/entities/faculty/faculty.reducer';
import financeReport, { IFinanceReportState } from 'app/entities/finance-report/finance-report.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */
// prettier-ignore
import user, {
  IUserState
} from 'app/modules/user-profile/user-profile.reducer';
import advancedSearchModal, { IAdvancedSearchModalState } from 'app/shared/components/advancedSearchModal/advancedSearchModal.reducer';
export interface IRootState {
  readonly authentication: IAuthenticationInitialState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: IAdministrationState;
  readonly userManagement: IUserManagementState;
  readonly event: IEventState;
  readonly eventCrew: IEventCrewState;
  readonly eventAttendee: IEventAttendeeState;
  readonly budget: IBudgetState;
  readonly eventActivity: IEventActivityState;
  readonly eventChecklist: IEventChecklistState;
  readonly transaction: ITransactionState;
  readonly claim: IClaimState;
  readonly debt: IDebtState;
  readonly administrator: IAdministratorState;
  readonly clubFamily: IClubFamilyState;
  readonly userCCInfo: IUserCCInfoState;
  readonly userUniInfo: IUserUniInfoState;
  readonly faculty: IFacultyState;
  readonly financeReport: IFinanceReportState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
  readonly user: IUserState;
  readonly advancedSearchModal: IAdvancedSearchModalState;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  event,
  eventCrew,
  eventAttendee,
  budget,
  eventActivity,
  eventChecklist,
  transaction,
  claim,
  debt,
  administrator,
  clubFamily,
  userCCInfo,
  userUniInfo,
  faculty,
  financeReport,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
  user,
  advancedSearchModal,
});

export default rootReducer;
