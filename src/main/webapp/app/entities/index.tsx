import React from 'react';
import { RouteComponentProps, Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Event from './event';
import EventCrew from './event-crew';
import EventAttendee from './event-attendee';
import Budget from './budget';
import EventActivity from './event-activity';
import EventChecklist from './event-checklist';
import Transaction from './transaction';
import Claim from './claim';
import Debt from './debt';
import Administrator from './administrator';
import ClubFamily from './club-family';
import UserCCInfo from './user-cc-info';
import UserUniInfo from './user-uni-info';
import Faculty from './faculty';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes: React.FC<RouteComponentProps> = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/event`} component={Event} />
      <ErrorBoundaryRoute path={`${match.url}/event-crew`} component={EventCrew} />
      <ErrorBoundaryRoute path={`${match.url}/event-attendee`} component={EventAttendee} />
      <ErrorBoundaryRoute path={`${match.url}/event-budget`} component={Budget} />
      <ErrorBoundaryRoute path={`${match.url}/event-activity`} component={EventActivity} />
      <ErrorBoundaryRoute path={`${match.url}/event-checklist`} component={EventChecklist} />
      <ErrorBoundaryRoute path={`${match.url}/transaction`} component={Transaction} />
      <ErrorBoundaryRoute path={`${match.url}/claim`} component={Claim} />
      <ErrorBoundaryRoute path={`${match.url}/debt`} component={Debt} />
      <ErrorBoundaryRoute path={`${match.url}/administrator`} component={Administrator} />
      <ErrorBoundaryRoute path={`${match.url}/members/club-family`} component={ClubFamily} />
      <ErrorBoundaryRoute path={`${match.url}/user-cc-info`} component={UserCCInfo} />
      <ErrorBoundaryRoute path={`${match.url}/user-uni-info`} component={UserUniInfo} />
      <ErrorBoundaryRoute path={`${match.url}/faculty`} component={Faculty} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
