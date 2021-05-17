import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardImg, Button } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// tslint:disable-next-line:no-unused-variable
import { APP_DATE_12_ABR_FORMAT } from 'app/config/constants';

import './events.scss';
import AuthorizationChecker from 'app/shared/components/authorization-checker/authorization-checker';
import CCRole from 'app/shared/model/enum/cc-role.enum';
import EventRole from 'app/shared/model/enum/event-role.enum';
import { IEvent } from 'app/shared/model/event.model';

export interface IEventCardProps {
  event: IEvent;
  toggleModal: (eventId?: number) => void;
}

const EventCard: React.FC<IEventCardProps> = ({ event, toggleModal }) => {
  function onToggleModal(): void {
    toggleModal(event.id);
  }

  return (
    <Card className="p-3 pt-4 event-card">
      <AuthorizationChecker ccRole={CCRole.ADMIN} eventRole={EventRole.HEAD} eventId={event.id}>
        <Button color="link" className="option-icon p-0" onClick={onToggleModal}>
          <FontAwesomeIcon icon={'ellipsis-h'} />
        </Button>
      </AuthorizationChecker>
      <Link to={`/entity/event/${event.id}`}>
        <Row>
          <Col xs="4" lg="5" className="pr-0">
            <CardImg
              height="100%"
              width="100%"
              className="rounded-0"
              src={event.imageUrl ?? 'content/images/placeholder.png'}
              alt={event.fileName}
            />
          </Col>
          <Col xs="8" lg="7">
            <div className="my-auto">
              <h4 className="event-title">{event.name}</h4>
              <p className="mb-0">
                <Translate contentKey="clubmanagementApp.event.startDate">Start Date</Translate>:{' '}
                <TextFormat type="date" value={event.startDate ?? ''} format={APP_DATE_12_ABR_FORMAT} />
              </p>
              <p className="mb-0">
                <Translate contentKey="clubmanagementApp.event.endDate">End Date</Translate>:{' '}
                <TextFormat type="date" value={event.endDate ?? ''} format={APP_DATE_12_ABR_FORMAT} />
              </p>
              <p className="mb-0">
                <Translate contentKey="clubmanagementApp.event.venue">Venue</Translate>: {event.venue}
              </p>
            </div>
          </Col>
        </Row>
      </Link>
    </Card>
  );
};

export default EventCard;
