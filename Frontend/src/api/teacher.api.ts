import fetchHandler from './axios'

export const GET_ALL_TEACHER = 'teacher/getteacherinlab'
export const GET_TEACHER_BY_ID = 'teacher'
export const SEARCH_BY_NAME = 'teacher/getteacherinlabbyname'
export const GET_NO_LAB = 'teacher/getteachernolab'
export const ADD_TEACHER = 'teacher/addteachertolab'
export const DELETE_TEACHER = 'teacher/deleteteacherinlab'

const teacherAPI = {
  getAllTeacherInLab: (labId: string, abortSignal: IAbortSignal) => {
    return fetchHandler.get<ListTeacher>(GET_ALL_TEACHER + `/${labId}`, { ...abortSignal })
  },
  getTeacherById: (id: string) => {
    return fetchHandler.get<DetailTeacher>(GET_TEACHER_BY_ID + `/${id}`)
  },
  searchByName: (body: { searchName: string }) => {
    return fetchHandler.post<ListTeacher>(SEARCH_BY_NAME, body)
  },
  getTeacherNoLab: () => {
    return fetchHandler.get<ListTeacher>(GET_NO_LAB)
  },
  addTeacherToLab: (body: { teacherId: GUID; labId: GUID }) => {
    return fetchHandler.post<DetailTeacher>(ADD_TEACHER, body)
  },
  deleteTeacher: (body: { teacherId: GUID }) => {
    return fetchHandler.post<Dennis>(DELETE_TEACHER, body)
  }
}

export default teacherAPI

export type DetailTeacher = {
  id: string
  name: string
  dateOfBirth: string
  department: string
  phoneNumber: string
  email: string
  major: boolean
  key: GUID
}

export type ListTeacher = DetailTeacher[]
