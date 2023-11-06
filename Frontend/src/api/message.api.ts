import fetchHandler from './axios'

export const GET_MSG = 'message/getallmsg'
export const ADD = 'message/addnewmsg'

const messageAPI = {
  getMsg: (id: GUID) => {
    return fetchHandler.get<ListMessages>(GET_MSG + '/' + id)
  }
}

export default messageAPI

export type Message = {
  message: string
  user: { userId: GUID; name: string }
  createdDate: Date
  isSender: boolean
}

export type ListMessages = Message[]
