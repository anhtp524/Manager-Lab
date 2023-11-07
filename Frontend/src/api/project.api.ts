import { ProjectStatus } from '~/routes/util'
import fetchHandler from './axios'

export const GET_ALL_PROJECT = 'project/getall'
export const GET_PROJECT_IN_LAB = 'project/getprojectinlab'
export const GET_CURRENT_USER_PROJECT = 'project/getmyproject'
export const CREATE_PROJECT = 'project/createproject'
export const GET_BY_ID = 'project/getdetail'
export const START_PROJECT = 'project/ongoingproject'
export const CANCEL_PROJECT = 'project/cancelproject'

const projectAPI = {
  getAll: (abortSignal: IAbortSignal) => {
    return fetchHandler.get(GET_ALL_PROJECT, { ...abortSignal })
  },
  getProjectInLab: (id: GUID, abortSignal?: IAbortSignal) => {
    return fetchHandler.get<ProjectList>(GET_PROJECT_IN_LAB + '/' + id, { ...abortSignal })
  },
  createProject: (body: CreateProjectRequest) => {
    return fetchHandler.post<Project>(CREATE_PROJECT, body)
  },
  getById: (id: GUID, abortSignal: IAbortSignal) => {
    return fetchHandler.get<DetailProject>(GET_BY_ID + '/' + id, { ...abortSignal })
  },
  getCurrentUserProject: (abortSignal: IAbortSignal) => {
    return fetchHandler.get<ProjectList>(GET_CURRENT_USER_PROJECT, { ...abortSignal })
  },
  start: (id: GUID) => {
    return fetchHandler.get<Project>(START_PROJECT + '/' + id)
  },
  cancel: (body: { projectId: GUID }) => {
    return fetchHandler.post<Project>(CANCEL_PROJECT, body)
  }
}

export default projectAPI

export type Project = {
  key: GUID
  id: GUID
  name: string
  description: string
  coreTech: string
  status: ProjectStatus
}

export type DetailProject = Project & {
  students: StudentInProject[]
  teachers: TeacherInProject[]
}

export type TeacherInProject = {
  name: string
}

export type StudentInProject = {
  name: string
  msv: number
  class: string
}

export type ProjectList = Project[]

export type CreateProjectRequest = {
  projectAdd: {
    name: string
    description: string
    coreTech: string
  }
  listStudent: string[]
  listTeacher: string[]
  listAttachment: string[]
}
