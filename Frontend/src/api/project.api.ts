import { ProjectStatus } from '~/routes/util'
import fetchHandler from './axios'

export const GET_ALL_PROJECT = 'project/getall'
export const GET_PROJECT_IN_LAB = 'project/getprojectinlab'

const projectAPI = {
  getAll: (abortSignal: IAbortSignal) => {
    return fetchHandler.get(GET_ALL_PROJECT, { ...abortSignal })
  },
  getProjectInLab: (id: GUID, abortSignal: IAbortSignal) => {
    return fetchHandler.get<ProjectList>(GET_PROJECT_IN_LAB + '/' + id, { ...abortSignal })
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

export type ProjectList = Project[]
