import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { ButtonGroup, Button } from 'reactstrap';
import classnames from 'classnames';

import './custom-tab.scss';
import { Translate } from 'react-jhipster';
import { Link } from 'react-router-dom';
import AuthorizationChecker, {
  IAuthorizationCheckerOwnProps,
  authorizationCheck,
} from 'app/shared/components/authorization-checker/authorization-checker';

interface ICustomTabOwnProps {
  currentTab: string;
  tabList: ITabInfo[];
}

interface ICustomTabProps extends ICustomTabOwnProps, StateProps {}

export interface ITabInfo extends IAuthorizationCheckerOwnProps {
  tabName: string;
  tabTranslateKey: string;
  tabRoute: string;
}

class CustomTab extends React.Component<ICustomTabProps, {}> {
  private scrollerRef: React.RefObject<any>;

  constructor(props: ICustomTabProps) {
    super(props);
    this.scrollerRef = React.createRef();
  }

  componentDidMount() {
    const tabPos = this.props.tabList.findIndex(tabItem => tabItem.tabName === this.props.currentTab);
    if (!this.scrollerRef.current) return;
    this.scrollerRef.current.scrollLeft = tabPos * 50;
  }

  render() {
    const { tabList, currentTab } = this.props;
    const tabsThatWillBeShow = tabList.filter(tabInfo => {
      const { eventId } = tabInfo;
      const { eventHeadEventIds, eventCrewEventIds } = this.props;
      const isEventHead = Boolean(eventId && eventHeadEventIds.includes(eventId));
      const isEventCrew = Boolean(eventId && eventCrewEventIds.includes(eventId));
      const authorizationState = { ...this.props, isEventHead, isEventCrew };
      return authorizationCheck(tabInfo, authorizationState);
    });
    if (tabsThatWillBeShow.length < 2) return null;
    return (
      <div className="overflow-x-scroll tab-x-space" ref={this.scrollerRef}>
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

const mapStateToProps = ({ authentication }: IRootState) => authentication;

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(CustomTab);

interface ITabItemProps {
  currentTab: string;
  tabInfo: ITabInfo;
}

const TabItem: React.FC<ITabItemProps> = ({ currentTab, tabInfo }) => {
  const isCurrentTab: boolean = tabInfo.tabName === currentTab;
  const btnClassName = classnames('tab-item', isCurrentTab ? 'active-tab' : '');
  return (
    <AuthorizationChecker {...tabInfo}>
      <Button key={tabInfo.tabName} id="tab-btn" color="#07ADE1" className={btnClassName} tag={Link} to={tabInfo.tabRoute}>
        <Translate contentKey={tabInfo.tabTranslateKey}>{tabInfo.tabName}</Translate>
      </Button>
    </AuthorizationChecker>
  );
};
