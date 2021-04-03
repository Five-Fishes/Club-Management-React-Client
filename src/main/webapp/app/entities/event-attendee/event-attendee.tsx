import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Row, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { eventTabList } from 'app/shared/util/tab.constants';

import { IRootState } from 'app/shared/reducers';
import { getEventAttendeeEntities } from './event-attendee.reducer';
// tslint:disable-next-line:no-unused-variable
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { CustomTab } from 'app/shared/components/customTab/custom-tab';
import './event-attendee.scss';

export interface IEventAttendeeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string; eventId: string }> {}

export type IEventAttendeeState = IPaginationBaseState;

export class EventAttendee extends React.Component<IEventAttendeeProps> {
  state = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE),
    modalIsOpen: false,
    eventId: this.props.match.params.eventId
  };

  componentDidMount() {
    this.getEntities();
  }

  openModal = () => {
    this.setState({ ...this.state, modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ ...this.state, modalIsOpen: false });
  };

  contactUser = contactNumber => {
    window.open(`https://wa.me/${contactNumber}`, '_blank');
  };

  sort = (sortProp, orderProp) => {
    this.setState(
      {
        order: orderProp,
        sort: sortProp
      },
      () => {
        this.sortEntities();
        this.closeModal();
      }
    );
  };

  sortEntities() {
    this.getEntities();
    this.props.history.push(
      `${this.props.location.pathname}?page=${this.state.activePage}` +
        (this.state.sort ? `&sort=${this.state.sort},${this.state.order}` : '')
    );
  }

  handlePagination = activePage => {
    this.setState({ activePage }, () => this.sortEntities());
  };

  getEntities = () => {
    const { eventId, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEventAttendeeEntities(eventId, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { eventAttendeeList, totalItems } = this.props;
    return (
      <div>
        <Modal isOpen={this.state.modalIsOpen} toggle={this.closeModal}>
          <ModalHeader toggle={this.closeModal}>
            <Translate contentKey="clubmanagementApp.eventAttendee.sortBy.title">Sort By</Translate>
          </ModalHeader>
          <ModalBody id="clubmanagementApp.eventAttendee.sortBy.options">
            <Button color="secondary" size="lg" block onClick={this.sort.bind(this, '', '')}>
              <Translate contentKey="clubmanagementApp.eventAttendee.sortBy.sortById">Sort By Id</Translate>
            </Button>
            <Button color="secondary" size="lg" block onClick={this.sort.bind(this, 'yearSession', 'asc')}>
              <Translate contentKey="clubmanagementApp.eventAttendee.sortBy.sortByYearSessionAsc">Older Year Session First</Translate>
            </Button>
            <Button color="secondary" size="lg" block onClick={this.sort.bind(this, 'yearSession', 'asc')}>
              <Translate contentKey="clubmanagementApp.eventAttendee.sortBy.sortByYearSessionDesc">Newer Year Session First</Translate>
            </Button>
            <Button color="secondary" size="lg" block onClick={this.sort.bind(this, 'provideTransport', 'desc')}>
              <Translate contentKey="clubmanagementApp.eventAttendee.sortBy.provideTransportFirst">Provide Transport First</Translate>
            </Button>
            <Button color="secondary" size="lg" block onClick={this.sort.bind(this, 'provideTransport', 'asc')}>
              <Translate contentKey="clubmanagementApp.eventAttendee.sortBy.noProvideTransportFirst">
                Does Not Provide Transport First
              </Translate>
            </Button>
          </ModalBody>
        </Modal>
        <div className="my-4">
          <CustomTab currentTab="Attendees" tabList={eventTabList(this.state.eventId)} />
        </div>
        <h2 id="event-attendee-heading">
          <Translate contentKey="clubmanagementApp.eventAttendee.home.title">Event Attendees</Translate>
        </h2>
        <Button className="btn btn-primary float-right" id="event-attendee-sort-by-button" onClick={this.openModal}>
          <FontAwesomeIcon icon="sort-amount-up" />
          &nbsp;
          <Translate contentKey="clubmanagementApp.eventAttendee.home.sortBy">Sort By</Translate>
        </Button>
        <div className="table-responsive">
          {eventAttendeeList && eventAttendeeList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="clubmanagementApp.eventAttendee.userName">User Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="clubmanagementApp.eventAttendee.session">Session</Translate>
                  </th>
                  <th />
                  <th />
                </tr>
              </thead>
              <tbody>
                {eventAttendeeList.map((eventAttendee, i) => (
                  <tr key={`entity-${i + 1}`}>
                    <td>{i + 1}</td>
                    <td>{eventAttendee.userName}</td>
                    <td>{eventAttendee.year}</td>
                    <td>{eventAttendee.provideTransport ? <FontAwesomeIcon icon="car" /> : null}</td>
                    <td>
                      <Button color="Link" className="icon-btn" onClick={this.contactUser.bind(eventAttendee.contactNumber)}>
                        <FontAwesomeIcon icon={['fab', 'whatsapp-square']} color="#25D366" size="lg" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="clubmanagementApp.eventAttendee.home.notFound">No Event Attendees found</Translate>
            </div>
          )}
        </div>
        <div className={eventAttendeeList && eventAttendeeList.length > 0 ? '' : 'd-none'}>
          <Row className="justify-content-center">
            <JhiItemCount page={this.state.activePage} total={totalItems} itemsPerPage={this.state.itemsPerPage} i18nEnabled />
          </Row>
          <Row className="justify-content-center">
            <JhiPagination
              activePage={this.state.activePage}
              onSelect={this.handlePagination}
              maxButtons={5}
              itemsPerPage={this.state.itemsPerPage}
              totalItems={this.props.totalItems}
            />
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ eventAttendee }: IRootState) => ({
  eventAttendeeList: eventAttendee.entities,
  totalItems: eventAttendee.totalItems
});

const mapDispatchToProps = {
  getEventAttendeeEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventAttendee);
