import './event-details.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClock, faMapMarkerAlt, faMoneyBillAlt } from '@fortawesome/free-solid-svg-icons';

class EventDetails extends React.Component {
  render() {
    return (
      <div>
        <h1>Event Details</h1>

        <img
          className="event-img"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"
          alt="Event Image"
        />
        <div className="my-4">
          <h2>Third CC First Gathering</h2>
          <div className="event-details-info my-3">
            <FontAwesomeIcon icon={faCalendarAlt} size="sm" />
            <h6>Date: 2020-10-20</h6>

            <FontAwesomeIcon icon={faClock} size="sm" />
            <h6>Time: 07:30pm</h6>

            <FontAwesomeIcon icon={faMapMarkerAlt} size="sm" />
            <h6> Venue: Tanjung KK3</h6>

            <FontAwesomeIcon icon={faMoneyBillAlt} size="sm" />
            <h6>Fee: Free</h6>
          </div>
          <hr />
          <div className="desc-box">
            <h5>Description</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras euismod maximus aliquet. Integer velit enim, bibendum et magna
              et, porttitor euismod metus. Aenean ac massa finibus, mattis enim hendrerit, pharetra nibh.
            </p>
          </div>
          <div className="d-flex flex-column">
            <Button className="my-1" color="secondary">
              Update
            </Button>
            <Button className="my-1" color="action">
              Register
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default EventDetails;
