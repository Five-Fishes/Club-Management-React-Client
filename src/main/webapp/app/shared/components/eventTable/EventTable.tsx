import React from 'react';
import { Table } from 'reactstrap';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { EventTableRow } from './EventTableRow';

export interface IEventTableProps<T> {
  hasNumbering?: boolean;
  hasWhatsapp?: boolean;
  hasIcon?: boolean;
  icon?: IconProp;
  columns: Partial<Record<keyof T, string>>;
  dataSet: ReadonlyArray<T>;
  openModal?: (id: number) => void;
}

export class EventTable<T> extends React.Component<IEventTableProps<T>> {
  render() {
    const { hasNumbering, hasWhatsapp, hasIcon, icon, columns, dataSet, openModal } = this.props;
    const allowedField: string[] = Object.keys(columns);

    const filteredRecord = dataSet.map(data => {
      return Object.keys(data)
        .filter(key => allowedField.includes(key))
        .reduce((obj: Record<string, any>, key) => {
          obj[key] = data[key as keyof T];
          return obj;
        }, {});
    });

    return (
      <Table responsive size="sm">
        <thead>
          {hasNumbering ? <th>#</th> : null}
          {Object.keys(columns).map(key => {
            if (key === 'id') {
              return null;
            } else {
              return <th>{columns[key as keyof T]}</th>;
            }
          })}
        </thead>
        <tbody>
          {filteredRecord.map((data, index) => (
            <EventTableRow
              key={data.id}
              record={data}
              columns={columns}
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
