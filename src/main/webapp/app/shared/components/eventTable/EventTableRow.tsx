import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'reactstrap';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface IEventTableRowProps<T> {
  record: Record<string, any>;
  columns: Partial<Record<keyof T, string>>;
  index: number;
  hasNumbering?: boolean;
  hasWhatsapp?: boolean;
  hasIcon?: boolean;
  icon?: IconProp;
  openModal?: (id: number) => void;
}

export class EventTableRow<T> extends React.Component<IEventTableRowProps<T>> {
  contactUser(): void {
    window.open(`https://wa.me/+60${this.props.record.contactNumber}`, '_blank');
  }

  openModal(): void {
    if (this.props.openModal) {
      this.props.openModal(this.props.record.id);
    }
  }

  render() {
    const { record, columns, hasNumbering, hasWhatsapp, hasIcon, icon, index, openModal } = this.props;

    return (
      <tr>
        {hasNumbering && <td scope="row">{index + 1}</td>}
        {Object.keys(columns).map(key => {
          if (key === 'id') {
            return null;
          } else {
            return <td key={record[key]}>{record[key]}</td>;
          }
        })}
        {hasIcon && icon ? (
          <td>
            <FontAwesomeIcon icon={icon} />
          </td>
        ) : null}
        {hasWhatsapp ? (
          <td>
            <Button color="Link" className="icon-btn" onClick={this.contactUser}>
              <FontAwesomeIcon icon={['fab', 'whatsapp-square']} color="#25D366" size="lg" />
            </Button>
          </td>
        ) : null}
        {openModal ? (
          <td>
            <Button color="Link" className="icon-btn" onClick={this.openModal}>
              <FontAwesomeIcon icon="ellipsis-v" color="#07ade1" />
            </Button>
          </td>
        ) : null}
      </tr>
    );
  }
}
