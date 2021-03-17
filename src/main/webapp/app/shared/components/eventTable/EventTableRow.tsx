import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'reactstrap';
import { IEventCrew } from 'app/shared/model/event-crew.model';
import { IEventAttendee } from 'app/shared/model/event-attendee.model';

export interface IEventTableRowProps {
  user: IEventCrew | IEventAttendee | any;
  index: number;
  openModal: Function;
}

export class EventTableRow extends React.Component<IEventTableRowProps> {
  onToggleModal = () => this.props.openModal(this.props.user.id);

  contactUser = () => {
    window.open(`https://wa.me/${this.props.user.contactNumber}`, '_blank');
  };

  render() {
    const { user, index } = this.props;

    return (
      <tr>
        <td scope="row">{index + 1}</td>
        <td>{user.name}</td>
        <td>{user.role ? user.role : user.year}</td>
        <td>{user.provideTransport ? <FontAwesomeIcon icon="car" /> : null}</td>
        <td>
          <Button color="Link" className="icon-btn" onClick={this.contactUser}>
            <FontAwesomeIcon icon={['fab', 'whatsapp-square']} color="#25D366" size="lg" />
          </Button>
        </td>
        <td>
          <Button onClick={this.onToggleModal} color="Link" className="icon-btn">
            <FontAwesomeIcon icon="ellipsis-v" color="#07ade1" />
          </Button>
        </td>
      </tr>
    );
  }
}
