import React, { ButtonHTMLAttributes, MouseEventHandler, useEffect } from 'react';
import { Button, Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './filterButton.scss';
import classNames from 'classnames';
import { Translate } from 'react-jhipster';

interface IFilterButtonProps {
  selectedValue: string;
  filterOptions: string[];
  onChange: (valueChanged: string) => void;
}

interface IFilterButtonState {
  showOptions: boolean;
}

class FilterButton extends React.Component<IFilterButtonProps, IFilterButtonState> {
  constructor(props: IFilterButtonProps) {
    super(props);
    this.state = {
      showOptions: false,
    };
  }

  showOptionsModal = (): void => {
    this.setState({
      ...this.state,
      showOptions: true,
    });
  };

  toggleShowOptions = (): void => {
    this.setState({
      ...this.state,
      showOptions: !this.state.showOptions,
    });
  };

  selectFilterOption = (option: string): any => {
    this.props.onChange(option);
    this.toggleShowOptions();
  };

  render() {
    const { selectedValue, filterOptions } = this.props;
    const { showOptions } = this.state;
    return (
      <>
        <Button className="float-right filter-button" onClick={this.showOptionsModal}>
          <FontAwesomeIcon icon="calendar-alt" color="#07ADE1" />
          &nbsp;<span className="filter-display-text">{selectedValue}</span>
        </Button>

        <Modal size="md" isOpen={showOptions} toggle={this.toggleShowOptions} centered>
          <ModalHeader toggle={this.toggleShowOptions} className="filter-modal-header" />
          <ModalBody className="filter-modal-body">
            <h2 className="text-center">
              <Translate contentKey="global.menu.entities.filterOptions">Filter Options</Translate>{' '}
            </h2>
            <div className="d-flex flex-column mt-4">
              <Row>
                {filterOptions.length > 0 &&
                  filterOptions.map((option, i) => (
                    <Col md="4" xs="6" key={`filter-option-${i}`}>
                      <FilterOption text={option} value={option} selected={selectedValue === option} onClick={this.selectFilterOption} />
                    </Col>
                  ))}
              </Row>
            </div>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

interface IFilterOption {
  text: string;
  value: string;
  selected: boolean;
  onClick: (valueChanged: string) => void;
}

const FilterOption: React.FC<IFilterOption> = ({ text, value, onClick, selected }) => {
  const buttonClickHandler = () => onClick(value);
  const btnClassName = classNames('d-block', 'mx-auto', 'mb-2', 'filter-option', selected ? 'selected-filter-option' : '');

  return (
    <>
      <Button className={btnClassName} onClick={buttonClickHandler}>
        {text}
      </Button>
    </>
  );
};

export default FilterButton;
