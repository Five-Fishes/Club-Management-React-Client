import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Translate, translate } from 'react-jhipster';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './club-family.reducer';
import '../../styles/member-module.scss';
import CustomTab from 'app/shared/components/customTab/custom-tab';
import { memberTabList } from 'app/shared/util/tab.constants';
import ListingCard from 'app/shared/components/listing-card/listing-card';

export interface IClubFamilyProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class ClubFamily extends React.Component<IClubFamilyProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { clubFamilyList, match } = this.props;
    return (
      <div>
        <h2 id="club-family-heading" className="member-module-heading">
          <Translate contentKey="clubmanagementApp.clubFamily.home.title">CC Family</Translate>
        </h2>
        <div className="my-3">
          <CustomTab tabList={memberTabList} currentTab="CC Family" key={Date.now()} />
        </div>
        <div className="mx-4">
          {clubFamilyList && clubFamilyList.length > 0 ? (
            clubFamilyList.map((clubFamily, i) => (
              <Link to={`${match.url}/${clubFamily.code}`} key={`club-family-link-${clubFamily.code}`}>
                <ListingCard key={`club-family-${clubFamily.code}`} showActionMenu={false} title={translate(clubFamily.name ?? '')} />
              </Link>
            ))
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="clubmanagementApp.clubFamily.home.notFound">No Club Families found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ clubFamily }: IRootState) => ({
  clubFamilyList: clubFamily.entities,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ClubFamily);
