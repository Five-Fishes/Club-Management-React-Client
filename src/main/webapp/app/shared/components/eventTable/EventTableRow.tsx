import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'reactstrap';
import { IEventCrew } from 'app/shared/model/event-crew.model';
import { IEventAttendee } from 'app/shared/model/event-attendee.model';

export interface IEventTableRowProps {
  user: IEventCrew | IEventAttendee;
  index: number;
  openModal: Function;
}

export class EventTableRow extends React.Component<IEventTableRowProps> {
  state = { user: this.props.user };
  onToggleModal = () => this.props.openModal(this.props.user.id);

  contactUser = () => {
    window.open(`https://wa.me/+60${this.props.user.contactNumber}`, '_blank');
  };

  render() {
    const { user, index } = this.props;

    let thirdColumn;
    if ('role' in user) {
      thirdColumn = user.role;
    } else if ('year' in user) {
      thirdColumn = user.year;
    }

    return (
      <tr>
        <td scope="row">{index + 1}</td>
        <td>{user.userName}</td>
        <td>{thirdColumn}</td>
        <td>{'provideTransport' in user ? <FontAwesomeIcon icon="car" /> : null}</td>
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
