import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'reactstrap';
import { IEventAttendee } from 'app/shared/model/event-attendee.model';
import './event-attendee.scss';

export interface IEventAttendeeTableRowProps {
  user: IEventAttendee;
  index: number;
}

export class EventAttendeeRow extends React.Component<IEventAttendeeTableRowProps> {
  state = { user: this.props.user };

  contactUser = () => {
    window.open(`https://wa.me/${this.props.user.contactNumber}`, '_blank');
  };

  render() {
    const { user, index } = this.props;
    return (
      <tr key={`event-attendee-${index + 1}`}>
        <td scope="row">{index + 1}</td>
        <td>{user.userName}</td>
        <td>{user.year}</td>
        <td>{'provideTransport' in user ? <FontAwesomeIcon icon="car" /> : null}</td>
        <td>
          <Button color="Link" className="icon-btn" onClick={this.contactUser}>
            <FontAwesomeIcon icon={['fab', 'whatsapp-square']} color="#25D366" size="lg" />
          </Button>
        </td>
      </tr>
    );
  }
}
