import { IEventCrew } from 'app/shared/model/event-crew.model';
import React from 'react';
import { Table } from 'reactstrap';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { EventTableRow } from './EventTableRow';

// type asdf = keyof T;
export interface IEventTableProps<T> {
  hasNumbering?: boolean;
  hasWhatsapp?: boolean;
  hasIcon?: boolean;
  icon?: IconProp;
  //   fields: { [key: string]: string };
  fields: Partial<Record<keyof T, string>>;
  records: ReadonlyArray<T>;
  openModal?: (id: number) => void;
}

export class EventTable<T> extends React.Component<IEventTableProps<T>> {
  render() {
    const { hasNumbering, hasWhatsapp, hasIcon, icon, fields, records, openModal } = this.props;
    const allowedField: string[] = Object.keys(fields);

    const filteredRecord = records.map(record => {
      return Object.keys(record)
        .filter(key => allowedField.includes(key))
        .reduce((obj: Record<string, any>, key) => {
          obj[key] = record[key as keyof T];
          return obj;
        }, {});
    });

    return (
      <Table responsive size="sm">
        <thead>
          {hasNumbering ? <th>#</th> : null}
          {Object.keys(fields).map(key => {
            if (key === 'id') {
              return null;
            } else {
              return <th>{fields[key as keyof T]}</th>;
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
              hasNumbering={hasNumbering}
              hasWhatsapp={hasWhatsapp}
              hasIcon={hasIcon}
              icon={icon}
            />
          ))}
        </tbody>
      </Table>
    );
  }
}
