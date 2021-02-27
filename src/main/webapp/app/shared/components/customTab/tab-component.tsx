import React from 'react';
import { ButtonGroup, Button } from 'reactstrap';
import classnames from 'classnames';

import './tab-component.scss';

export interface ITabProps {
  currentTab: string;
  tabList: ITabInfo[];
}

export interface ITabState {
  activeTab: string;
}

export interface ITabInfo {
  tabName: string;
  tabRoute: string;
}

export class CustomTab extends React.Component<ITabProps, ITabState> {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: this.props.currentTab
    };
  }

  toggle(value: string) {
    this.setState({
      activeTab: value
    });
  }

  render() {
    const { activeTab } = this.state;
    return (
      <div className="overflow-x-scroll">
        <ButtonGroup>
          <TabItems itemsList={this.props.tabList} activeTab={activeTab} />
        </ButtonGroup>
      </div>
    );
  }
}

const navigateTo = (path: string) => () => {
  window.location.href = path;
};

const TabItems = ({ itemsList, activeTab }) =>
  itemsList.map(item => (
    <Button
      id="tab-btn"
      onClick={navigateTo(item.tabRoute)}
      color="#07ADE1"
      className={classnames('tab-item', item.tabName === activeTab ? 'active-tab' : '')}
    >
      {item.tabName}
    </Button>
  ));
