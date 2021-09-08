import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, Label, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate } from 'react-jhipster';
import './filterSearchBar.scss';

interface IFilterSearchBarProps {
  //   onChange: () => void;
}
interface IFilterSearchBarState {
  showOptions: boolean;
}

class FilterSearchBar extends React.Component<IFilterSearchBarProps, IFilterSearchBarState> {
  constructor(props: IFilterSearchBarProps) {
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

  render() {
    const { showOptions } = this.state;
    return (
      <>
        <Button className="filter-bar" onClick={this.showOptionsModal}>
          <div className="float-left">
            <FontAwesomeIcon icon="search" color="#07ADE1" />
            &nbsp; <span className="filter-bar-text">Type to search more...</span>
          </div>
        </Button>

        <Modal id="myModal" className="advanced-search-modal" size="md" isOpen={showOptions} toggle={this.toggleShowOptions} centered>
          <ModalHeader toggle={this.toggleShowOptions} className="filter-modal-header" />
          <ModalBody className="filter-modal-body">
            <h2 className="text-center mb-4">Advanced Search</h2>
            <AvForm>
              <AvGroup>
                <AvInput id="myInput" type="text" placeholder="Name" className="form-control" name="id" autoFocus />
              </AvGroup>
              <AvGroup>
                <AvInput type="text" placeholder="Faculty" className="form-control" name="id" />
              </AvGroup>
              <AvGroup>
                <AvInput type="text" placeholder="Enrolled Year" className="form-control" name="id" />
              </AvGroup>
              <AvGroup>
                <h6 className="ml-2 ">CC Family</h6>
                <div className="family-button-group">
                  <Button className="rounded-pill m-1" color="bimu">
                    Bimu
                  </Button>
                  <Button className="rounded-pill m-1" color="jinlong">
                    Jin Long
                  </Button>
                  <Button className="rounded-pill m-1" color="nemo">
                    Nemo
                  </Button>
                  <Button className="rounded-pill m-1" color="peacock">
                    Peacock
                  </Button>
                  <Button className="rounded-pill m-1" color="qicai">
                    Qi Cai
                  </Button>
                </div>
              </AvGroup>
              <div className="general-buttonContainer--flexContainer mt-5">
                <Button className="general-button--width" id="cancel-save" replace color="cancel" onClick={this.toggleShowOptions}>
                  <Translate contentKey="entity.action.cancel">Cancel</Translate>
                </Button>
                &nbsp;
                <Button className="general-button--width" color="action" id="save-entity" type="submit">
                  Search
                </Button>
              </div>
            </AvForm>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

export default FilterSearchBar;
