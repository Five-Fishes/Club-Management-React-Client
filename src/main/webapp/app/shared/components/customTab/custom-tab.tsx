import React from 'react';
import { ButtonGroup, Button } from 'reactstrap';
import classnames from 'classnames';

import './custom-tab.scss';
import { Translate } from 'react-jhipster';

export interface ITabProps {
  currentTab: string;
  tabList: ITabInfo[];
}

export interface ITabInfo {
  tabName: string;
  tabTranslateKey: string;
  tabRoute: string;
}

export class CustomTab extends React.Component<ITabProps, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="overflow-x-scroll tab-container my-2">
        <ButtonGroup>
          <TabItems itemsList={this.props.tabList} activeTab={this.props.currentTab} />
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
      <Translate contentKey={item.tabTranslateKey}>{item.tabName}</Translate>
    </Button>
  ));
