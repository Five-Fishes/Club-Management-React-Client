export interface ICourseProgram {
  id?: number;
  facultyId?: number;
  name?: string;
  numOfSem?: number;
}

export const defaultValue: Readonly<ICourseProgram> = {};
