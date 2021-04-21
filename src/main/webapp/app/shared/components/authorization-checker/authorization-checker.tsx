import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import CCRole from 'app/shared/model/enum/cc-role.enum';
import EventRole from 'app/shared/model/enum/event-role.enum';

interface IAuthorizationCheckerOwnProps {
  ccRole: CCRole;
  eventRole?: EventRole;
  eventId?: number;
}

interface IAuthorizationCheckerProps extends IAuthorizationCheckerOwnProps, StateProps {}

class AuthorizationChecker extends React.Component<IAuthorizationCheckerProps, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    const { children, ccRole, eventRole, isAuthenticated, isCurrentCCHead, isCurrentAdministrator, isEventHead, isEventCrew } = this.props;
    if (!isAuthenticated) return null;
    const isOnlyCCHeadCanView = ccRole === CCRole.HEAD;
    if (isOnlyCCHeadCanView && !isCurrentCCHead) return null;
    const isOnlyCCAdminCanView = ccRole === CCRole.ADMIN;
    if (isOnlyCCAdminCanView && !isCurrentAdministrator) return null;
    const isPassCCHeadCheck = isOnlyCCHeadCanView && isCurrentCCHead;
    const isPassCCAdminCheck = isOnlyCCAdminCanView && isCurrentAdministrator;
    const hasEventRole = typeof eventRole !== 'undefined';
    const shouldCheckEventRole = !isPassCCHeadCheck && !isPassCCAdminCheck && hasEventRole;
    if (shouldCheckEventRole) {
      const isOnlyEventHeadCanView = eventRole === EventRole.HEAD;
      if (isOnlyEventHeadCanView && !isEventHead) return null;
      const isOnlyEventCrewCanView = eventRole === EventRole.CREW;
      if (isOnlyEventCrewCanView && !isEventCrew) return null;
    }
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
