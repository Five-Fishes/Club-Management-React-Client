import axios from 'axios';
import store from 'app/config/store';
import { ACTION_TYPES as COMPLETE_PROFILE_ACTION } from '../../modules/auth/complete-profile/complete-profile.reducer';

export async function getFacultyList(page?: number, size?: number, sort?: string): Promise<void> {
  const requestUrl = `api/faculties${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  const res = await axios.get(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`);
  store.dispatch({ type: COMPLETE_PROFILE_ACTION.FETCH_FACULTY_LIST, payload: res.data });
}

export async function getCourseProgramByFacultyId(facultyId: number | string, page?: number, size?: number, sort: string): Promise<void> {
  const requestUrl = `api/course-programs/faculty/${facultyId}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  const res = await axios.get(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`);
  store.dispatch({ type: COMPLETE_PROFILE_ACTION.FETCH_COURSEPROGRAM_LIST, payload: res.data });
}

export async function getYearSessionList(page?: number, size?: number, sort?: string): Promise<void> {
  const requestUrl = `api/year-sessions${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  const res = await axios.get(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`);
  store.dispatch({ type: COMPLETE_PROFILE_ACTION.FETCH_YEARSESSION_LIST, payload: res.data });
}
