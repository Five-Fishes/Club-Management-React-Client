import { updateKey, updateKeys } from 'app/shared/util/deep-copy-utils';
import { memberTabList } from 'app/shared/util/tab.constants';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps, useLocation } from 'react-router-dom';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import CustomTab from 'app/shared/components/customTab/custom-tab';
import { SearchEngine } from 'app/shared/util/native-search-utils';
import { IUserCCInfo } from 'app/shared/model/user-cc-info.model';
import { generateIndex } from './member.indexer';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const member: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  const searchEngine: SearchEngine<IUserCCInfo> = new SearchEngine([], generateIndex);
  const query = useQuery();
  const [viewModel, setViewModel] = useState({
    isLoading: false,
    dropdownOpen: false,
    selectedYearSession: '2019/2020',
    memberName: '',
    yearSessionList: ['2019/2020', '2020/2021', '2021/2022', '2022/2023', '2023/2024', '2024/2025', '2025/2026'],
    retrievedMembers: [],
  });

  const toggle: React.MouseEventHandler = () => {
    const currentViewModel = updateKey(viewModel, 'dropdownOpen', !viewModel.dropdownOpen);
    setViewModel(currentViewModel);
  };

  useEffect(() => {
    search();
  }, []);

  const updateViewModel: React.ChangeEventHandler<HTMLInputElement> = event => {
    const currentViewModel = updateKey(viewModel, 'memberName', event.target.value);
    setViewModel(currentViewModel);
  };

  const search = () => {
    const currentViewModel = updateKey(viewModel, 'isLoading', true);
    setViewModel(currentViewModel);

    const searchString = `api/cc-members?yearSession.equals=${viewModel.selectedYearSession}`;

    axios
      .get<IUserCCInfo[]>(searchString)
      .then(response => {
        const values = new Map();
        if (response?.data) {
          const filteredResponseData = searchEngine.updateEngine(response.data).search(viewModel.memberName);
          values.set('retrievedMembers', filteredResponseData);
        }
        values.set('isLoading', false);
        const currentViewModel1 = updateKeys(viewModel, values);
        setViewModel(currentViewModel1);
      })
      .catch(alert);
  };

  return (
    <>
      <div>
        <h2 id="club-family-heading" className="member-module-heading">
          Fishes
        </h2>
        <div className="my-3">
          <CustomTab tabList={memberTabList} currentTab="CC Family" key={Date.now()} />
        </div>
        <div className="jumbotron container">
          <div className="row">
            <div className="col-4">
              <Dropdown isOpen={viewModel.dropdownOpen} toggle={toggle}>
                <DropdownToggle caret>{viewModel.selectedYearSession}</DropdownToggle>
                <DropdownMenu>
                  {viewModel.yearSessionList ? (
                    viewModel.yearSessionList.map(yearSession => {
                      const setYearSession = () => {
                        viewModel.selectedYearSession = yearSession;
                        setViewModel(viewModel);
                      };

                      return (
                        <DropdownItem key={yearSession}>
                          <div onClick={setYearSession}>{yearSession}</div>
                        </DropdownItem>
                      );
                    })
                  ) : (
                    <DropdownItem>no year session</DropdownItem>
                  )}
                </DropdownMenu>
              </Dropdown>
            </div>
            <div className="col-8">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <button className="btn btn-outline-secondary" type="button" onClick={search}>
                    search
                  </button>
                </div>
                <input
                  name="memberName"
                  type="text"
                  className="form-control"
                  placeholder=""
                  aria-label=""
                  aria-describedby="basic-addon1"
                  value={viewModel.memberName}
                  onChange={updateViewModel}
                />
              </div>
            </div>
          </div>
          <div className="row container">
            <div className="container">
              {viewModel.isLoading ? (
                `Loading`
              ) : (
                <div>
                  {viewModel?.retrievedMembers &&
                    viewModel.retrievedMembers.map((retrievedMember: any) => {
                      return (
                        <div className="row" key={retrievedMember.id}>
                          {JSON.stringify(retrievedMember.user)}
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default member;
