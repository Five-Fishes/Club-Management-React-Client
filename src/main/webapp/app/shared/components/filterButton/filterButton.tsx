import React, { ButtonHTMLAttributes, MouseEventHandler, useEffect } from 'react';
import { Button, Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './filterButton.scss';

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

        <Modal isOpen={showOptions} toggle={this.toggleShowOptions} centered>
          <ModalHeader toggle={this.toggleShowOptions}>
            <h2 className="text-center">Filter Options</h2>
          </ModalHeader>
          <ModalBody className="px-4">
            <Row>
              {filterOptions.length > 0 &&
                filterOptions.map((option, i) => (
                  <Col md="4" xs="6">
                    <FilterOption key={`filter-option-${i}`} text={option} value={option} onClick={this.selectFilterOption} />
                  </Col>
                ))}
            </Row>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

interface IFilterOption {
  text: string;
  value: string;
  onClick: (valueChanged: string) => void;
}

const FilterOption: React.FC<IFilterOption> = ({ text, value, onClick }) => {
  const buttonClickHandler = () => onClick(value);

  return (
    <>
      <Button className="d-block mx-auto mb-2" onClick={buttonClickHandler}>
        {text}
      </Button>
    </>
  );
};

export default FilterButton;
