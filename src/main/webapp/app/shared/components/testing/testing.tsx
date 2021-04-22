import React from 'react';
import AuthorizationChecker from '../authorization-checker/authorization-checker';
import CCRole from 'app/shared/model/enum/cc-role.enum';
import EventRole from 'app/shared/model/enum/event-role.enum';

function Testing() {
  return (
    <div>
      <h1>Testing Admin</h1>
      <AuthorizationChecker ccRole={CCRole.HEAD}>
        <div>Seeing CCRole Head</div>
      </AuthorizationChecker>
      <AuthorizationChecker ccRole={CCRole.ADMIN}>
        <div>Seeing CCRole Admin</div>
      </AuthorizationChecker>
      <AuthorizationChecker ccRole={CCRole.ADMIN} eventId={1} eventRole={EventRole.HEAD}>
        <div>Testing CC Role will not check Event role</div>
      </AuthorizationChecker>
    </div>
  );
}

export default Testing;
