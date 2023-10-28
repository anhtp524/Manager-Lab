import fetchHandler from './axios'

export const GET_ALL_LAB = 'lab/getall'

const labAPI = {
  getAll: (abortSignal: IAbortSignal) => {
    return fetchHandler.get<ListLab>(GET_ALL_LAB, { ...abortSignal })
  }
}

export default labAPI

export type Lab = {
  id: GUID
  name: string
  description: string
}

export type ListLab = Lab[]
