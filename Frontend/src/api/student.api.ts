import fetchHandler from './axios'

export const GET_ALL_STUDENT = 'student/getall'
export const GET_STUDENT_BY_ID = 'student/getstudentbyid'

const studentAPI = {
  getAll: (abortSignal: IAbortSignal) => {
    return fetchHandler.get<ListStudent>(GET_ALL_STUDENT, { ...abortSignal })
  },
  getStudentById: (id: string) => {
    return fetchHandler.get<DetailStudent>(GET_STUDENT_BY_ID + `/${id}`)
  }
}

export default studentAPI

export type DetailStudent = {
  key: string
  id: string
  studentCode: number
  name: string
  dateOfBirth: string
  class: string
  phoneNumber: string
  email: string
  isApproveToLab: boolean
  isApproveToProject: boolean
}

export type ListStudent = DetailStudent[]
