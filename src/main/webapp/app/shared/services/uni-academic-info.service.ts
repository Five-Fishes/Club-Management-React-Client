import axios from 'axios';
import store from 'app/config/store';
import { ACTION_TYPES as USER_PROFILE_ACTION } from '../../modules/user-profile/user-profile.reducer';

export async function getFacultyList(page?: number, size?: number, sort?: string): Promise<void> {
  const requestUrl = `api/faculties${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  const res = await axios.get(`${requestUrl}`);
  store.dispatch({ type: USER_PROFILE_ACTION.FETCH_FACULTY_LIST, payload: res });
}

export async function getCourseProgramByFacultyId(facultyId: number | string, page?: number, size?: number, sort?: string): Promise<void> {
  const requestUrl = `api/course-programs/faculty/${facultyId}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  const res = await axios.get(`${requestUrl}`);
  store.dispatch({ type: USER_PROFILE_ACTION.FETCH_COURSEPROGRAM_LIST, payload: res });
}

export async function getYearSessionList(page?: number, size?: number, sort?: string): Promise<void> {
  const requestUrl = `api/year-sessions${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  const res = await axios.get(`${requestUrl}`);
  store.dispatch({ type: USER_PROFILE_ACTION.FETCH_YEARSESSION_LIST, payload: res });
}
