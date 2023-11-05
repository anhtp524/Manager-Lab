import fetchHandler from './axios'
import { ProfileUser } from './user.api'

export const GET_ALL_STUDENT = 'student/getall'
export const GET_STUDENT_IN_LAB = 'student/getstudentinlab'
export const GET_STUDENT_BY_ID = 'student/getstudentbyid'
export const REGISTER_TO_LAB = 'student/registertolab'
export const WITHDRAW_FROM_LAB = 'student/withdrawfromlab'
export const GET_REGISTER_IN_LAB = 'student/getstudentregisterinlab'
export const APPROVE_TO_LAB = 'student/approvetolab'
export const REMOVE_FROM_LAB = 'student/deletestudentinlab'
export const SEARCH_BY_NAME = 'student/getstudentbyname'

const studentAPI = {
  getAll: (abortSignal: IAbortSignal) => {
    return fetchHandler.get<ListStudent>(GET_ALL_STUDENT, { ...abortSignal })
  },
  getStudentInLab: (labId: GUID, abortSignal: IAbortSignal) => {
    return fetchHandler.get<ListStudent>(GET_STUDENT_IN_LAB + '/' + labId, { ...abortSignal })
  },
  getStudentById: (id: GUID) => {
    return fetchHandler.get<DetailStudent>(GET_STUDENT_BY_ID + `/${id}`)
  },
  registerToLab: (body: { labId: GUID }) => {
    return fetchHandler.post<ProfileUser>(REGISTER_TO_LAB, body)
  },
  withDrawFromLab: (body: { labId: GUID }) => {
    return fetchHandler.post<ProfileUser>(WITHDRAW_FROM_LAB, body)
  },
  getStudentRegisterInLab: (id: GUID, abortSignal: IAbortSignal) => {
    return fetchHandler.get<ListPendingStudent>(GET_REGISTER_IN_LAB + '/' + id, { ...abortSignal })
  },
  approveToLab: (body: { studentId: GUID }) => {
    return fetchHandler.post<ProfileUser>(APPROVE_TO_LAB, body)
  },
  removeFromLab: (body: { studentId: GUID }) => {
    return fetchHandler.post<ProfileUser>(REMOVE_FROM_LAB, body)
  },
  searchByName: (body: { searchName: string }) => {
    return fetchHandler.post<ListStudent>(SEARCH_BY_NAME, body)
  }
}

export default studentAPI

export type DetailStudent = StudentBase & { lab: { id: GUID } | null }
export type PendingStudent = StudentBase & { lab: { id: GUID; name: string; description: string } }

export type StudentBase = {
  id: string
  studentCode: number
  name: string
  dateOfBirth: string
  class: string
  phoneNumber: string
  email: string
  isApproveToLab: boolean
}

export type ListStudent = DetailStudent[]
export type ListPendingStudent = PendingStudent[]
