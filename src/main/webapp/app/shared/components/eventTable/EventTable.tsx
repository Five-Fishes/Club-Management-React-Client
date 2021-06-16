import React from 'react';
import { Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { EventTableRow } from './EventTableRow';
import { IColumns } from '../../model/columns.model';

export interface IEventTableProps<T> {
  hasNumbering?: boolean;
  columns: IColumns[];
  dataSet: ReadonlyArray<T>;
  whatsappKey?: string;
  action?: (id: number) => void;
}

export class EventTable<T> extends React.Component<IEventTableProps<T>> {
  render() {
    const { hasNumbering, whatsappKey, columns, dataSet, action } = this.props;

    return dataSet && dataSet.length > 0 ? (
      <Table responsive size="sm" className="mt-4">
        <thead>
          {hasNumbering ? <th>#</th> : null}
          {columns.map(column => (
            <th key={column.title}>{column.title}</th>
          ))}
          {whatsappKey && <th />}
          {action && <th />}
        </thead>
        <tbody>
          {dataSet.map((data, index) => (
            <EventTableRow
              key={index}
              index={index}
              hasNumbering={hasNumbering}
              columns={columns}
              data={data}
              whatsappKey={whatsappKey}
              action={action}
            />
          ))}
        </tbody>
      </Table>
    ) : (
      <div className="alert alert-warning mt-3">
        <Translate contentKey="error.noResultFound" />
      </div>
    );
  }
}
