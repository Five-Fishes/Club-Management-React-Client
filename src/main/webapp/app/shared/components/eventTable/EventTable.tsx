import { IEventCrew } from 'app/shared/model/event-crew.model';
import React from 'react';
import { Table } from 'reactstrap';
import { EventTableRow } from './EventTableRow';

export interface IEventTableProps {
  hasNumbering?: boolean;
  fields: { [key: string]: string };
  records: ReadonlyArray<any>; //Set array generic type to object interface (Eg:IEventCrew)
  openModal?: (id: number) => void;
}

export class EventTable extends React.Component<IEventTableProps> {
  render() {
    const { hasNumbering, fields, records, openModal } = this.props;
    const allowedField: Array<string> = Object.keys(fields);

    const filteredRecord = records.map(record => {
      return Object.keys(record)
        .filter(key => allowedField.includes(key))
        .reduce((obj: any, key) => {
          obj[key] = record[key];
          return obj;
        }, {});
    });

    console.log(filteredRecord);
    return (
      <Table responsive size="sm">
        <thead>
          {hasNumbering ? <th>#</th> : null}
          {Object.keys(fields).map(key => {
            if (key == 'id') {
              return null;
            } else {
              return <th>{fields[key]}</th>;
            }
          })}
        </thead>
        <tbody>
          {filteredRecord.map((record, index) => (
            <EventTableRow
              key={record.id}
              record={record}
              fields={fields}
              index={index}
              openModal={openModal}
              hasNumbering={true}
            ></EventTableRow>
          ))}
        </tbody>
      </Table>
    );
  }
}
