import React from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './floatButton.css';

interface IFloatButton {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const FloatButton: React.FC<IFloatButton> = ({ onClick }) => (
  <Button color="action" className="floatButton shadow" onClick={onClick}>
    <FontAwesomeIcon icon="plus" size="lg" />
  </Button>
);

export default FloatButton;
