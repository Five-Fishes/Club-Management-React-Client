import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'reactstrap';
import { IEventCrew } from 'app/shared/model/event-crew.model';
import { IEventAttendee } from 'app/shared/model/event-attendee.model';
import { translate } from 'react-jhipster';

export interface IEventTableRowProps {
  record: { [key: string]: any };
  fields: { [key: string]: any };
  index: number;
  hasNumbering?: boolean;
  openModal?: (id: number) => void;
}

export class EventTableRow extends React.Component<IEventTableRowProps> {
  //   contactUser = () => {
  //     window.open(`https://wa.me/+60${this.props.record.contactNumber}`, '_blank');
  //   };

  render() {
    const { record, fields, hasNumbering, index, openModal } = this.props;

    return (
      <tr>
        {hasNumbering ? <td scope="row">{index + 1}</td> : null}
        {Object.keys(fields).map(key => {
          if (key == 'id') {
            return null;
          } else {
            return <td key={record[key]}>{record[key]}</td>;
          }
        })}
        {openModal ? (
          <td>
            <Button color="Link" className="icon-btn" onClick={() => openModal(this.props.record.id)}>
              <FontAwesomeIcon icon="ellipsis-v" color="#07ade1" />
            </Button>
          </td>
        ) : null}
      </tr>
    );
  }
}

{
  /* 
        <td>{record.userName}</td>
        <td>{'provideTransport' in record ? <FontAwesomeIcon icon="car" /> : null}</td>
        <td>
          <Button color="Link" className="icon-btn" onClick={this.contactUser}>
            <FontAwesomeIcon icon={['fab', 'whatsapp-square']} color="#25D366" size="lg" />
          </Button>
        </td>
        <td>
          
        </td> */
}
