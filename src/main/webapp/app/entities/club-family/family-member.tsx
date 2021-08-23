import React from 'react';

import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';

import AuthorizationChecker from 'app/shared/components/authorization-checker/authorization-checker';
import CCRole from 'app/shared/model/enum/cc-role.enum';
import EventRole from 'app/shared/model/enum/event-role.enum';

export interface IFamilyMemberProps extends StateProps, DispatchProps, RouteComponentProps {}

class FamilyMember extends React.Component<IFamilyMemberProps> {
  constructor(props: IFamilyMemberProps) {
    super(props);
  }
  render() {
    return (
      <div className="mx-3">
        <Row>
          <Col md="8">
            <h2>Bi Mu</h2>
            <AuthorizationChecker ccRole={CCRole.ADMIN} eventRole={EventRole.HEAD}>
              <Link className="btn btn-action jh-create-entity w-100 my-2" to={'/entity/members/club-family/BI_MU/new'}>
                <Translate contentKey="entity.action.add">Add</Translate>
              </Link>
            </AuthorizationChecker>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FamilyMember);
