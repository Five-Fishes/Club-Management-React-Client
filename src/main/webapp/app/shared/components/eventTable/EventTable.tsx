import React from 'react';
import { Table } from 'reactstrap';
import { EventTableRow } from './EventTableRow';
import { IEventCrew } from 'app/shared/model/event-crew.model';

export interface IEventTableProps {
  users: IEventCrew[];
  openModal: Function;
}

export class EventTable extends React.Component<IEventTableProps> {
  tableList = this.props.users.map((user, index) => {
    return <EventTableRow user={user} index={index} openModal={this.props.openModal} />;
  });

  render() {
    return (
      <Table responsive size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Role</th>
            <th />
            <th />
            <th />
          </tr>
        </thead>
        {this.tableList}
      </Table>
    );
  }
}
