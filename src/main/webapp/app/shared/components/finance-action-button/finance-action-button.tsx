import React, { FunctionComponent, ReactElement } from 'react';
import { Button } from 'reactstrap';
import './finance-action-button.scss';

interface IFinanceActionButtonProps {
  name: string | ReactElement;
  color: string;
  onClick: () => void;
}

export const FinanceActionButton = ({ name, color, onClick }: IFinanceActionButtonProps) => (
  <Button color={color} onClick={onClick} className="action-button">
    {name}
  </Button>
);
