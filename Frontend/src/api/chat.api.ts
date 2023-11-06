import fetchHandler from './axios'

export const GET_ALL_BOX_CHAT = 'boxchat/getallboxchat'
export const CREATE = 'boxchat/createboxchat'

const chatAPI = {
  getAllBoxChat: (abortSignal: IAbortSignal) => {
    return fetchHandler.get<ListBoxChat>(GET_ALL_BOX_CHAT, { ...abortSignal })
  },
  create: (body: CreateBoxChatRequest) => {
    return fetchHandler.post<number>(CREATE, body)
  }
}

export default chatAPI

export type BoxChat = {
  id: GUID
  name: string
}

export type ListBoxChat = BoxChat[]

export type CreateBoxChatRequest = {
  name: string
  userId: GUID[]
}
