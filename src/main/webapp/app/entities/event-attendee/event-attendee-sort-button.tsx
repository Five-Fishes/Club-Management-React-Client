import React from 'react';
import { Button } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { IEventAttendeeSortButtonInfo } from 'app/entities/event-attendee/event-attendee-sort-modal';

export interface IEventAttendeeButtonProps {
  buttonInfo: IEventAttendeeSortButtonInfo;
  sort: Function;
}

export class EventAttendeeSortButton extends React.Component<IEventAttendeeButtonProps> {
  onButtonClick = () => {
    this.props.sort(this.props.buttonInfo.buttonSortProp, this.props.buttonInfo.buttonOrderProp);
  };
  render() {
    return (
      <Button color="secondary" size="lg" block onClick={this.onButtonClick}>
        <Translate contentKey={this.props.buttonInfo.buttonTranslateKey}>{this.props.buttonInfo.buttonName}</Translate>
      </Button>
    );
  }
}
