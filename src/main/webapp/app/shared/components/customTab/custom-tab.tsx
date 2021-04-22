import React from 'react';
import { ButtonGroup, Button } from 'reactstrap';
import classnames from 'classnames';

import './custom-tab.scss';
import { Translate } from 'react-jhipster';
import { Link } from 'react-router-dom';

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
  private scrollerRef;

  constructor(props) {
    super(props);
    this.scrollerRef = React.createRef();
  }

  componentDidMount() {
    const tabPos = this.props.tabList.findIndex(tabItem => tabItem.tabName === this.props.currentTab);
    this.scrollerRef.current.scrollLeft = tabPos * 50;
  }

  render() {
    return (
      <div className="overflow-x-scroll tab-x-space" ref={this.scrollerRef}>
        <div className="tab-container my-2 text-center">
          <ButtonGroup className="w-100 px-3">
            <TabItems itemsList={this.props.tabList} activeTab={this.props.currentTab} />
          </ButtonGroup>
        </div>
      </div>
    );
  }
}

const TabItems = ({ itemsList, activeTab }) =>
  itemsList.map(item => (
    <Button
      key={item.tabName}
      id="tab-btn"
      color="#07ADE1"
      className={classnames('tab-item', item.tabName === activeTab ? 'active-tab' : '')}
      tag={Link}
      to={item.tabRoute}
    >
      <Translate contentKey={item.tabTranslateKey}>{item.tabName}</Translate>
    </Button>
  ));
