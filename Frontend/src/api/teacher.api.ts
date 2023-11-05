import fetchHandler from './axios'

export const GET_ALL_TEACHER = 'teacher/getteacherinlab'
export const GET_TEACHER_BY_ID = 'teacher'
export const SEARCH_BY_NAME = 'teacher/getteacherinlabbyname'

const teacherAPI = {
  getAllTeacherInLab: (labId: string, abortSignal: IAbortSignal) => {
    return fetchHandler.get<ListTeacher>(GET_ALL_TEACHER + `/${labId}`, { ...abortSignal })
  },
  getTeacherById: (id: string) => {
    return fetchHandler.get<DetailTeacher>(GET_TEACHER_BY_ID + `/${id}`)
  },
  searchByName: (body: { searchName: string }) => {
    return fetchHandler.post<ListTeacher>(SEARCH_BY_NAME, body)
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
}

export type ListTeacher = DetailTeacher[]
