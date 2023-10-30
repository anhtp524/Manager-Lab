import fetchHandler from './axios'

export const GET_PROFILE_USER = 'user/getprofileuser'

const userAPI = {
  getProfileUser: (abortSignal?: IAbortSignal) => {
    return fetchHandler.get<ProfileUser>(GET_PROFILE_USER, { ...abortSignal })
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
}
