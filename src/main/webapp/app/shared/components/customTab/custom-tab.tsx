import React from 'react';
import { ButtonGroup, Button } from 'reactstrap';
import classnames from 'classnames';

import './custom-tab.scss';
import { Translate } from 'react-jhipster';
import { Link } from 'react-router-dom';
import AuthorizationChecker, { IAuthorizationCheckerOwnProps } from 'app/shared/components/authorization-checker/authorization-checker';

export interface ITabProps {
  currentTab: string;
  tabList: ITabInfo[];
}

export interface ITabInfo extends IAuthorizationCheckerOwnProps {
  tabName: string;
  tabTranslateKey: string;
  tabRoute: string;
}

export class CustomTab extends React.Component<ITabProps, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    const { tabList, currentTab } = this.props;
    return (
      <div className="overflow-x-scroll tab-x-space">
        <div className="tab-container my-2 text-center">
          <ButtonGroup className="w-100 px-3">
            {tabList.map(tabInfo => (
              <TabItem key={tabInfo.tabName} currentTab={currentTab} tabInfo={tabInfo} />
            ))}
          </ButtonGroup>
        </div>
      </div>
    );
  }
}

interface ITabItemProps {
  currentTab: string;
  tabInfo: ITabInfo;
}

const TabItem: React.FC<ITabItemProps> = ({ currentTab, tabInfo }) => {
  const isCurrentTab: boolean = tabInfo.tabName === currentTab;
  return (
    <AuthorizationChecker {...tabInfo}>
      <Button id="tab-btn" color="#07ADE1" className={classnames('tab-item', isCurrentTab ? 'active-tab' : '')}>
        <Link to={tabInfo.tabRoute} className="link-unstyled">
          <Translate contentKey={tabInfo.tabTranslateKey}>{tabInfo.tabName}</Translate>
        </Link>
      </Button>
    </AuthorizationChecker>
  );
};
