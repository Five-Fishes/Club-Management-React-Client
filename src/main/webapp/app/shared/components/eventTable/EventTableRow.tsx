import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'reactstrap';
import { IColumns } from './columns.model';

export interface IEventTableRowProps<T> {
  data: Record<string, any>;
  columns: Array<IColumns>;
  index: number;
  hasNumbering?: boolean;
  whatsappKey?: string;
  openModal?: (id: number) => void;
}

export class EventTableRow<T> extends React.Component<IEventTableRowProps<T>> {
  constructor(props: IEventTableRowProps<T>) {
    super(props);
    this.openModal = this.openModal.bind(this);
    this.contactUser = this.contactUser.bind(this);
  }

  contactUser(): void {
    if (this.props.whatsappKey) {
      window.open(`https://wa.me/+60${this.props.data[this.props.whatsappKey]}`, '_blank');
    }
  }

  openModal(): void {
    if (this.props.openModal) {
      this.props.openModal(this.props.data.id);
    }
  }

  render() {
    const { data, columns, hasNumbering, whatsappKey, index, openModal } = this.props;

    return (
      <tr>
        {hasNumbering && <td scope="row">{index + 1}</td>}
        {columns.map(column => {
          return <td key={data[column.key]}>{column.replaceValue ?? data[column.key]}</td>;
        })}
        {whatsappKey ? (
          <td>
            <Button color="Link" className="icon-btn" onClick={this.contactUser} disabled={!this.props.data[whatsappKey]}>
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
