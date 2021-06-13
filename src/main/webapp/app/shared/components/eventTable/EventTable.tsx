import React from 'react';
import { Table } from 'reactstrap';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Translate } from 'react-jhipster';
import { EventTableRow } from './EventTableRow';
import { IColumns } from './columns.model';

export interface IEventTableProps<T> {
  hasNumbering?: boolean;
  whatsappKey?: string;
  hasIcon?: boolean;
  icon?: IconProp;
  columns: Array<IColumns>;
  dataSet: ReadonlyArray<T>;
  openModal?: (id: number) => void;
}

export class EventTable<T> extends React.Component<IEventTableProps<T>> {
  render() {
    const { hasNumbering, whatsappKey, columns, dataSet, openModal } = this.props;

    return dataSet && dataSet.length > 0 ? (
      <Table responsive size="sm">
        <thead>
          {hasNumbering ? <th>#</th> : null}
          {columns.map(column => {
            return <th>{column.title}</th>;
          })}
        </thead>
        <tbody>
          {dataSet.map((data, index) => (
            <EventTableRow
              key={index} //data type
              data={data}
              columns={columns}
              index={index}
              openModal={openModal}
              hasNumbering={hasNumbering}
              whatsappKey={whatsappKey}
            />
          ))}
        </tbody>
      </Table>
    ) : (
      <div className="alert alert-warning">
        <Translate contentKey="clubmanagementApp.eventAttendee.home.notFound">No Event Attendees found</Translate>
      </div>
    );
  }
}
