import { ProjectStatus } from '~/routes/util'
import fetchHandler from './axios'

export const GET_ALL_PROJECT = 'project/getall'
export const GET_PROJECT_IN_LAB = 'project/getprojectinlab'
export const CREATE_PROJECT = 'project/createproject'
export const GET_BY_ID = 'project/getdetail'

const projectAPI = {
  getAll: (abortSignal: IAbortSignal) => {
    return fetchHandler.get(GET_ALL_PROJECT, { ...abortSignal })
  },
  getProjectInLab: (id: GUID, abortSignal?: IAbortSignal) => {
    return fetchHandler.get<ProjectList>(GET_PROJECT_IN_LAB + '/' + id, { ...abortSignal })
  },
  createProject: (body: CreateProjectRequest) => {
    return fetchHandler.post<Dennis>(CREATE_PROJECT, body)
  },
  getById: (id: GUID, abortSignal: IAbortSignal) => {
    return fetchHandler.get<DetailProject>(GET_BY_ID + '/' + id, { ...abortSignal })
  }
}

export default projectAPI

export type Project = {
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
