import React from 'react';
import { Table } from 'reactstrap';
import { EventTableRow } from './EventTableRow';
import { IEventCrew } from 'app/shared/model/event-crew.model';
import { IEventAttendee } from 'app/shared/model/event-attendee.model';
import { Translate } from 'react-jhipster';

export interface IEventTableProps {
  users: ReadonlyArray<IEventCrew> | ReadonlyArray<IEventAttendee>;
  openModal: Function;
}

export class EventTable extends React.Component<IEventTableProps> {
  render() {
    return (
      <Table responsive size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>
              <Translate contentKey="clubmanagementApp.event.name">Name</Translate>{' '}
            </th>
            <th>{'role' in this.props.users[0] ? <Translate contentKey="clubmanagementApp.eventCrew.role">Role</Translate> : 'Year'}</th>
            <th />
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {this.props.users.map((user, index) => (
            <EventTableRow key={user.id} user={user} index={index} openModal={this.props.openModal} />
          ))}
        </tbody>
      </Table>
    );
  }
}
