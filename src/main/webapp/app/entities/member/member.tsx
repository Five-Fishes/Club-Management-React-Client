import { updateKey, updateKeys } from 'app/shared/util/deep-copy-utils';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps, useLocation } from 'react-router-dom';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const member: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
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

    const searchString: string = `api/cc-members?yearSession.equals=${viewModel.selectedYearSession}`;

    axios
      .get(searchString)
      .then(response => {
        const values = new Map();
        if (response?.data) {
          const filteredResponseData = filterByName(viewModel.memberName, response.data);
          values.set('retrievedMembers', filteredResponseData);
        }
        values.set('isLoading', false);
        const currentViewModel = updateKeys(viewModel, values);
        setViewModel(currentViewModel);
      })
      .catch(alert);
  };

  const filterByName = (name: string, data: any[]): any[] => {
    let filteredData: any[] = [];
    data.forEach(member => {
      const searchIndex = [
        (member.user.firstName as string).toLowerCase().trim() + (member.user.lastName as string).toLowerCase().trim(),
        (member.user.lastName as string).toLowerCase().trim() + (member.user.firstName as string).toLowerCase().trim(),
      ];

      const nameMatched = searchIndex.filter(nameIndex => nameIndex.includes(name.replace(/\s+/g, '').toLowerCase())).length > 0;
      nameMatched && filteredData.push(member);
    });
    return filteredData;
  };

  const setYearSession = (yearSession: string) => {
    viewModel.selectedYearSession = yearSession;
    setViewModel(viewModel);
  };

  return (
    <>
      <div className="jumbotron container">
        <div className="row">
          <div className="col-4">
            <Dropdown isOpen={viewModel.dropdownOpen} toggle={toggle}>
              <DropdownToggle caret>{viewModel.selectedYearSession}</DropdownToggle>
              <DropdownMenu>
                {viewModel.yearSessionList ? (
                  viewModel.yearSessionList.map(yearSession => {
                    return (
                      <DropdownItem key={yearSession}>
                        <div onClick={() => setYearSession(yearSession)}>{yearSession}</div>
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
              ></input>
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
                  viewModel.retrievedMembers.map((member: any) => {
                    return (
                      <div className="row" key={member.id}>
                        {JSON.stringify(member.user)}
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default member;
