import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardImg, Button } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AuthorizationChecker from 'app/shared/components/authorization-checker/authorization-checker';
import CCRole from 'app/shared/model/enum/cc-role.enum';
import EventRole from 'app/shared/model/enum/event-role.enum';
import { concatFullName } from 'app/shared/util/string-util';

import { IUserCCInfo } from 'app/shared/model/user-cc-info.model';

export interface IMemberCardProps {
  userCCInfo: IUserCCInfo;
}

const MemberCard: React.FC<IMemberCardProps> = ({ userCCInfo }) => {
  return (
    <Card className="p-3 my-3">
      <Row noGutters>
        <Col xs="2" className="mr-1">
          <CardImg className="rounded-circle" src="content/images/placeholder.png"></CardImg>
        </Col>
        <Col xs="8" className="mx-2">
          <h5 className="mb-1">{concatFullName(userCCInfo.user?.firstName, userCCInfo.user?.lastName)}</h5>
          <p className="mb-0">{userCCInfo.familyRole ?? 'Member'}</p>
        </Col>
        <Col xs="1" className="d-flex justify-content-end align-items-center">
          <Button color="link" className="p-0">
            <FontAwesomeIcon icon={'ellipsis-v'} />
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default MemberCard;
