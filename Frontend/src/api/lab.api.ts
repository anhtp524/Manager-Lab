import fetchHandler from './axios'
import { DetailTeacher } from './teacher.api'

export const GET_ALL_LAB = 'lab/getall'
export const GET_LAB_BY_ID = 'lab/getdetaillab'
export const CREATE_LAB = 'lab/createlab'

const labAPI = {
  getAll: (abortSignal: IAbortSignal) => {
    return fetchHandler.get<ListLab>(GET_ALL_LAB, { ...abortSignal })
  },
  getLabById: (id: GUID, abortSignal: IAbortSignal) => {
    return fetchHandler.get<Lab>(GET_LAB_BY_ID + '/' + id, { ...abortSignal })
  },
  createLab: (body: CreateLabRequest) => {
    return fetchHandler.post<Lab>(CREATE_LAB, body)
  }
}

export default labAPI

export type Lab = {
  id: GUID
  name: string
  description: string
  isLabHead: boolean
  teacher: DetailTeacher
}

export type ListLab = Lab[]

export type CreateLabRequest = {
  name: string
  description: string
}
