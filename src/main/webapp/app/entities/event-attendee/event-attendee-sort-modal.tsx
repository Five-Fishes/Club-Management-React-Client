import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { eventAttendeeSortButtonList } from 'app/shared/util/event-attendee-sort.constants';
import { EventAttendeeSortButton } from 'app/entities/event-attendee/event-attendee-sort-button';

export interface IEventAttendeeSortButtonInfo {
  buttonName: string;
  buttonTranslateKey: string;
  buttonSortProp: string;
  buttonOrderProp: string;
}

export interface IEventAttendeeSortModalProps {
  isOpen: boolean;
  toggleModal: () => void;
  sort: (sortProp: any, orderProp: any) => void;
}

export class EventAttendeeSortModalModal extends React.Component<IEventAttendeeSortModalProps> {
  render() {
    const { isOpen, toggleModal, sort } = this.props;
    return (
      <Modal isOpen={isOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          <Translate contentKey="clubmanagementApp.eventAttendee.sortBy.title">Sort By</Translate>
        </ModalHeader>
        <ModalBody id="clubmanagementApp.eventAttendee.sortBy.options">
          <ButtonItems buttonList={eventAttendeeSortButtonList} sort={sort} />
        </ModalBody>
      </Modal>
    );
  }
}

interface IButtonItems {
  buttonList: IEventAttendeeSortButtonInfo[];
  sort: (sortProp: any, orderProp: any) => void;
}

const ButtonItems: React.FC<IButtonItems> = ({ buttonList, sort }) => (
  <>
    {buttonList.map(button => (
      <EventAttendeeSortButton buttonInfo={button} sort={sort} key={button.buttonName} />
    ))}
  </>
);
