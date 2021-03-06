import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import event, {
  EventState
} from 'app/entities/event/event.reducer';
// prettier-ignore
import eventCrew, {
  EventCrewState
} from 'app/entities/event-crew/event-crew.reducer';
// prettier-ignore
import eventAttendee, {
  EventAttendeeState
} from 'app/entities/event-attendee/event-attendee.reducer';
// prettier-ignore
import budget, {
  BudgetState
} from 'app/entities/budget/budget.reducer';
// prettier-ignore
import eventActivity, {
  EventActivityState
} from 'app/entities/event-activity/event-activity.reducer';
// prettier-ignore
import eventChecklist, {
  EventChecklistState
} from 'app/entities/event-checklist/event-checklist.reducer';
// prettier-ignore
import transaction, {
  TransactionState
} from 'app/entities/transaction/transaction.reducer';
// prettier-ignore
import claim, {
  ClaimState
} from 'app/entities/claim/claim.reducer';
// prettier-ignore
import debt, {
  DebtState
} from 'app/entities/debt/debt.reducer';
// prettier-ignore
import administrator, {
  AdministratorState
} from 'app/entities/administrator/administrator.reducer';
// prettier-ignore
import clubFamily, {
  ClubFamilyState
} from 'app/entities/club-family/club-family.reducer';
// prettier-ignore
import userCCInfo, {
  UserCCInfoState
} from 'app/entities/user-cc-info/user-cc-info.reducer';
// prettier-ignore
import userUniInfo, {
  UserUniInfoState
} from 'app/entities/user-uni-info/user-uni-info.reducer';
// prettier-ignore
import faculty, {
  FacultyState
} from 'app/entities/faculty/faculty.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly event: EventState;
  readonly eventCrew: EventCrewState;
  readonly eventAttendee: EventAttendeeState;
  readonly budget: BudgetState;
  readonly eventActivity: EventActivityState;
  readonly eventChecklist: EventChecklistState;
  readonly transaction: TransactionState;
  readonly claim: ClaimState;
  readonly debt: DebtState;
  readonly administrator: AdministratorState;
  readonly clubFamily: ClubFamilyState;
  readonly userCCInfo: UserCCInfoState;
  readonly userUniInfo: UserUniInfoState;
  readonly faculty: FacultyState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
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
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
