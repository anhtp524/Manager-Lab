import fetchHandler from './axios'

export const GET_PROFILE_USER = 'user/getprofileuser'
export const SEARCH_BY_NAME = 'user/getuserforchat'

const userAPI = {
  getProfileUser: (abortSignal?: IAbortSignal) => {
    return fetchHandler.get<ProfileUser>(GET_PROFILE_USER, { ...abortSignal })
  },
  searchByName: (body: { searchName: string }) => {
    return fetchHandler.post<{ userId: GUID; name: string }[]>(SEARCH_BY_NAME, body)
  }
}

export default userAPI

export type ProfileUser = {
  id: GUID
  studentCode: number
  name: string
  dateOfBirth: string
  class: string
  phoneNumber: string
  email: string
  isApproveToLab: boolean | null
  lab: { id: GUID } | null
  userId: GUID
}
