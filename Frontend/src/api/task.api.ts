import fetchHandler from './axios'

export const CREATE_TASK = 'task/createtask'
export const GET_LIST_TASK = 'task/getlisttask'
export const RESPONSE_TASK = 'task/responsetask'
export const CLOSE_TASK = 'task/closetask'
export const GET_BY_ID = 'task/getdetailtask'

const taskAPI = {
  getListTask: (projectId: GUID, abortSignal: IAbortSignal) => {
    return fetchHandler.get<Dennis>(GET_LIST_TASK + '/' + projectId, { ...abortSignal })
  },
  createTask: (body: CreateTaskRequest) => {
    return fetchHandler.post<Task>(CREATE_TASK, body)
  },
  responseTask: (body: ResponseTaskRequest) => {
    return fetchHandler.post<Task>(RESPONSE_TASK, body)
  },
  closeTask: (body: CloseTaskRequest) => {
    return fetchHandler.post<Task>(CLOSE_TASK, body)
  },
  getById: (taskId: GUID) => {
    return fetchHandler.get<Task>(GET_BY_ID + '/' + taskId)
  }
}

export default taskAPI

export type Task = {
  id: string
  title: string
  content: string
  createDate: string
  dueDate: string
  response: string
  status: TaskStatus
  feedback: string
}

export enum TaskStatus {
  New = 0,
  Resolve = 1,
  Pass = 2
}

export type CreateTaskRequest = {
  title: string
  content: string
  createDate: string
  dueDate: string
  projectId: string
}

export type ResponseTaskRequest = {
  taskId: string
  response: string
  listAttachment: string[]
}

export type CloseTaskRequest = {
  taskId: string
  isPass: boolean
  feedback: string
}

export type ListTask = Task[]
