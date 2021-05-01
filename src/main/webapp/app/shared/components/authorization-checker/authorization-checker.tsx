import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import CCRole from 'app/shared/model/enum/cc-role.enum';
import EventRole from 'app/shared/model/enum/event-role.enum';

interface IAuthorizationCheckerOwnProps {
  ccRole?: CCRole;
  eventRole?: EventRole;
  eventId?: number;
  fallbackEl?: React.ReactElement;
}

interface IAuthorizationCheckerProps extends IAuthorizationCheckerOwnProps, StateProps {}

class AuthorizationChecker extends React.Component<IAuthorizationCheckerProps, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      children,
      ccRole,
      eventRole,
      fallbackEl,
      eventId,
      isAuthenticated,
      isCurrentCCHead,
      isCurrentAdministrator,
      isEventHead,
      isEventCrew
    } = this.props;
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
    const hasPassChecking = hasPassCCRoleChecking || hasPassEventRoleChecking;
    const canRender = isAuthenticated && hasPassChecking;
    if (!canRender) return fallbackEl || null;
    return children;
  }
}

const mapStateToProps = ({ authentication }: IRootState, ownProps: IAuthorizationCheckerOwnProps) => {
  const { eventId } = ownProps;
  const { isAuthenticated, isCurrentCCHead, isCurrentAdministrator, eventHeadEventIds, eventCrewEventIds } = authentication;
  const isEventHead = eventId && eventHeadEventIds.includes(eventId);
  const isEventCrew = eventId && eventCrewEventIds.includes(eventId);
  return {
    isAuthenticated,
    isCurrentCCHead,
    isCurrentAdministrator,
    isEventHead,
    isEventCrew
  };
};

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(AuthorizationChecker);
