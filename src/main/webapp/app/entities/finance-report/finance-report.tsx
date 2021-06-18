import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate } from 'react-jhipster';

import { IRootState } from 'app/shared/reducers';
import { getFinanceReportStatisticOfCurrentYearSession } from './finance-report.reducer';
// tslint:disable-next-line:no-unused-variable
import CustomTab from 'app/shared/components/customTab/custom-tab';
import { financeTabList } from 'app/shared/util/tab.constants';
import { PieChart } from 'react-minimal-pie-chart';

export interface IFinanceReportProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

class FinanceReport extends React.Component<IFinanceReportProps> {
  componentDidMount() {
    this.props.getFinanceReportStatisticOfCurrentYearSession();
  }

  render() {
    const {
      realiseIncome = 0.0,
      pendingIncome = 0.0,
      realiseExpense = 0.0,
      pendingExpense = 0.0,
      invalidExpense = 0.0,
      badDebt = 0.0,
    } = this.props.financeReportStatistic;

    const chartData = [
      { title: 'Income', value: realiseIncome + pendingIncome, color: '#1DB2A1' },
      { title: 'Expense', value: realiseExpense + pendingExpense, color: '#DD5959' },
      { title: 'Invalid Expense', value: invalidExpense, color: '#55CD62' },
      { title: 'Bad Debt', value: badDebt, color: '#000000' },
    ];

    return (
      <div>
        <h2 id="debt-heading" className="finance-module-heading">
          <Translate contentKey="clubmanagementApp.financeReport.title">Finance Report</Translate>
        </h2>
        <CustomTab tabList={financeTabList} currentTab="Finance Report" />
        <div className="mx-4">
          <div>
            <div className="paper--lightblue">
              <Row>
                <Col xs="5" className="text-center-large">
                  <Translate contentKey="clubmanagementApp.financeReport.income">INCOME</Translate>
                </Col>
                <Col xs="7">
                  <Translate contentKey="clubmanagementApp.financeReport.realised">REALISED</Translate>: RM {realiseIncome}
                  <br />
                  <Translate contentKey="clubmanagementApp.financeReport.pending">PENDING</Translate>: RM {pendingIncome}
                </Col>
              </Row>
            </div>
            <div className="paper--red">
              <Row>
                <Col xs="5" className="text-center-large">
                  <Translate contentKey="clubmanagementApp.financeReport.expense">EXPENSE</Translate>
                </Col>
                <Col xs="7">
                  <Translate contentKey="clubmanagementApp.financeReport.realised">REALISED</Translate>: RM {realiseExpense}
                  <br />
                  <Translate contentKey="clubmanagementApp.financeReport.pending">PENDING</Translate>: RM {pendingExpense}
                </Col>
              </Row>
            </div>
            <div>
              <Row>
                <Col xs="6">
                  <div className="paper--green">
                    <Translate contentKey="clubmanagementApp.financeReport.invalidExpense">INVALID EXPENSE</Translate>
                    <br />
                    RM {invalidExpense}
                  </div>
                </Col>
                <Col xs="6">
                  <div className="paper--black">
                    <Translate contentKey="clubmanagementApp.financeReport.badDebt">Bad Debt</Translate>
                    <br />
                    RM {badDebt}
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          {/* tslint:disable-next-line:jsx-no-lambda */}
          <PieChart
            data={chartData}
            lineWidth={50}
            label={({ dataEntry }) => (dataEntry.value !== 0 ? `${Math.round(dataEntry.percentage)} %` : '')}
            labelStyle={() => ({
              fill: 'white',
              fontSize: '5px',
              fontFamily: 'sans-serif',
            })}
            labelPosition={75}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ financeReport }: IRootState) => ({
  financeReportStatistic: financeReport.entity,
});

const mapDispatchToProps = {
  getFinanceReportStatisticOfCurrentYearSession,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FinanceReport);
