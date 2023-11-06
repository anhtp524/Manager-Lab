import { createContext, useCallback, useContext, useState } from 'react'
import projectAPI, { ProjectList } from '~/api/project.api'
import { useHandlingApi } from '~/common/context/useHandlingApi'

export interface IProjectContext {
  labProjects: ProjectList
  getAllProjects: VoidFunction
}

export interface IProps {
  children?: React.ReactNode
}

export const ProjectContext = createContext<IProjectContext>({
  labProjects: [],
  getAllProjects: () => 1
})

export const ProjectProvider = (props: IProps) => {
  const [abortController] = useState<AbortController>(new AbortController())
  const { showLoading, closeLoading } = useHandlingApi()
  const [labProjects, setLabProjects] = useState<ProjectList>([])

  const handleGetLabProject = useCallback(async () => {
    showLoading()
    try {
      const response = await projectAPI.getCurrentUserProject({ signal: abortController.signal })
      if (response && response.data) {
        let newLabProjects = [...response.data]
        newLabProjects = newLabProjects.map((item) => {
          return { ...item, key: item.id }
        })
        setLabProjects(newLabProjects)
      }
    } catch (error: Dennis) {
      console.error(error)
    } finally {
      closeLoading()
    }
  }, [abortController])

  return (
    <ProjectContext.Provider value={{ labProjects: labProjects, getAllProjects: handleGetLabProject }}>
      {props.children}
    </ProjectContext.Provider>
  )
}

export const ProjectConsumer = ProjectContext.Consumer

export const useGetAllProject = () => useContext(ProjectContext)
