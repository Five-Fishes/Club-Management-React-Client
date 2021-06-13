import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'reactstrap';
import { IColumns } from '../../model/columns.model';

export interface IEventTableRowProps {
  hasNumbering?: boolean;
  index: number;
  columns: IColumns[];
  data: { [key: string]: any };
  whatsappKey?: string;
  action?: (id: number) => void;
}

export class EventTableRow extends React.Component<IEventTableRowProps> {
  constructor(props: IEventTableRowProps) {
    super(props);
    this.action = this.action.bind(this);
    this.contactUser = this.contactUser.bind(this);
  }

  contactUser(): void {
    if (this.props.whatsappKey) {
      window.open(`https://wa.me/+60${this.props.data[this.props.whatsappKey]}`, '_blank');
    }
  }

  action(): void {
    if (this.props.action) {
      this.props.action(this.props.data.id);
    }
  }

  render() {
    const { data, columns, hasNumbering, whatsappKey, index, action } = this.props;

    return (
      <tr>
        {hasNumbering && <td scope="row">{index + 1}</td>}
        {columns.map(column => {
          return <td key={data[column.key]}>{column.replaceValue && data[column.key] ? column.replaceValue : data[column.key]}</td>;
        })}
        {whatsappKey ? (
          <td>
            <Button color="Link" className="icon-btn" onClick={this.contactUser} disabled={!this.props.data[whatsappKey]}>
              <FontAwesomeIcon icon={['fab', 'whatsapp-square']} color="#25D366" size="lg" />
            </Button>
          </td>
        ) : null}
        {action ? (
          <td>
            <Button color="Link" className="icon-btn" onClick={this.action}>
              <FontAwesomeIcon icon="ellipsis-v" color="#07ade1" />
            </Button>
          </td>
        ) : null}
      </tr>
    );
  }
}
