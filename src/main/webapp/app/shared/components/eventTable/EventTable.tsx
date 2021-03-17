import React from 'react';
import { Table } from 'reactstrap';
import { EventTableRow } from './EventTableRow';
import { IEventCrew } from 'app/shared/model/event-crew.model';
import { IEventAttendee } from 'app/shared/model/event-attendee.model';

export interface IEventTableProps {
  users: IEventCrew[] | IEventAttendee[] | any[];
  openModal: Function;
}

export class EventTable extends React.Component<IEventTableProps> {
  tableList = this.props.users.map((user, index) => (
    <EventTableRow key={user.id} user={user} index={index} openModal={this.props.openModal} />
  ));

  render() {
    return (
      <Table responsive size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>{this.props.users[0].role ? 'Role' : 'Year'}</th>
            <th />
            <th />
            <th />
          </tr>
        </thead>
        <tbody>{this.tableList}</tbody>
      </Table>
    );
  }
}
