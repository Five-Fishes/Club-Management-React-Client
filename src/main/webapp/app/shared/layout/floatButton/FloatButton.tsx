import React from 'react';
import { Button } from 'reactstrap';
import {} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './floatButton.css';

const FloatButton = props => {
  console.log(props);
  return (
    <Button
      color="action"
      className="floatButton shadow"
      onClick={() => {
        props.onClick();
      }}
    >
      <FontAwesomeIcon icon="plus" size="lg" />
    </Button>
  );
};

export default FloatButton;
