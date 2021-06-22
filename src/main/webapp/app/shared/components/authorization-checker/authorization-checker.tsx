import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import CCRole from 'app/shared/model/enum/cc-role.enum';
import EventRole from 'app/shared/model/enum/event-role.enum';

interface IAuthorizationCondition {
  isPublic?: boolean;
  asLongAsIsAuthenticated?: boolean;
  ccRole?: CCRole;
  eventRole?: EventRole;
  eventId?: number;
}

interface IAuthorizationState {
  isAuthenticated: boolean;
  isCurrentCCHead: boolean;
  isCurrentAdministrator: boolean;
  isEventHead: boolean;
  isEventCrew: boolean;
}

export function authorizationCheck(authorizationCondition: IAuthorizationCondition, authorizationState: IAuthorizationState): boolean {
  const { isPublic, asLongAsIsAuthenticated, ccRole, eventRole, eventId } = authorizationCondition;
  const { isAuthenticated, isCurrentCCHead, isCurrentAdministrator, isEventHead, isEventCrew } = authorizationState;
  let hasPassCCRoleChecking = false;
  let hasPassEventRoleChecking = false;
  const hasCCRole = typeof ccRole !== 'undefined';
  const hasEventRole = typeof eventRole !== 'undefined';
  const hasEventId = typeof eventId !== 'undefined';
  if (hasCCRole) {
    const isOnlyCCHeadCanView = ccRole === CCRole.HEAD;
    const isOnlyCCAdminCanView = ccRole === CCRole.ADMIN;
    const hasPassCCHeadCheck = isOnlyCCHeadCanView && isCurrentCCHead;
    const hasPassCCAdminCheck = isOnlyCCAdminCanView && isCurrentAdministrator;
    hasPassCCRoleChecking = hasPassCCHeadCheck || hasPassCCAdminCheck;
  }
  if (hasEventRole && hasEventId) {
    const isOnlyEventHeadCanView = eventRole === EventRole.HEAD;
    const isOnlyEventCrewCanView = eventRole === EventRole.CREW;
    const hasPassEventHeadCheck = isOnlyEventHeadCanView && isEventHead;
    const hasPassEventCrewCheck = isOnlyEventCrewCanView && isEventCrew;
    hasPassEventRoleChecking = hasPassEventHeadCheck || hasPassEventCrewCheck;
  }
  const hasPassRoleChecking = hasPassCCRoleChecking || hasPassEventRoleChecking;
  const hasPassAuthenticatedChecking = asLongAsIsAuthenticated && isAuthenticated;
  return isPublic || hasPassAuthenticatedChecking || hasPassRoleChecking;
}

export interface IAuthorizationCheckerOwnProps extends IAuthorizationCondition {
  fallbackEl?: React.ReactElement;
}

interface IAuthorizationCheckerProps extends IAuthorizationCheckerOwnProps, StateProps {}

class AuthorizationChecker extends React.Component<IAuthorizationCheckerProps, {}> {
  constructor(props: IAuthorizationCheckerProps) {
    super(props);
  }

  render() {
    const { children, fallbackEl } = this.props;
    const canRender = authorizationCheck(this.props, this.props);
    if (!canRender) return fallbackEl || null;
    return children;
  }
}

const mapStateToProps = ({ authentication }: IRootState, ownProps: IAuthorizationCheckerOwnProps) => {
  const { eventId } = ownProps;
  const { isAuthenticated, isCurrentCCHead, isCurrentAdministrator, eventHeadEventIds, eventCrewEventIds } = authentication;
  const isEventHead = Boolean(eventId && eventHeadEventIds.includes(eventId));
  const isEventCrew = Boolean(eventId && eventCrewEventIds.includes(eventId));
  return {
    isAuthenticated,
    isCurrentCCHead,
    isCurrentAdministrator,
    isEventHead,
    isEventCrew,
  };
};

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(AuthorizationChecker);
