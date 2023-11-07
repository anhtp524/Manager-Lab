import { createContext, useCallback, useContext, useState } from 'react'
import projectAPI, { DetailProject } from '~/api/project.api'
import taskAPI, { ListTask } from '~/api/task.api'
import { useHandlingApi } from '~/common/context/useHandlingApi'

export interface IProjectChildrenContext extends GlobalContext {
  taskList: ListTask
  detailProject?: DetailProject
  getDetailProjectAndTasks: (id: GUID) => void
}

export interface IProps {
  children?: React.ReactNode
}

export const ProjectChildrenContext = createContext<IProjectChildrenContext>({
  taskList: [],
  detailProject: undefined,
  getDetailProjectAndTasks: () => 1
})

export const ProjectChildrenProvider = (props: IProps) => {
  const [abortController] = useState<AbortController>(new AbortController())
  const { showLoading, closeLoading } = useHandlingApi()
  const [detailProject, setDetailProject] = useState<DetailProject>()
  const [taskList, setTaskList] = useState<ListTask>([])
  const getDetailProjectAndTasks = useCallback(
    async (id: GUID) => {
      showLoading()
      try {
        const response = await Promise.all([
          projectAPI.getById(id, { signal: abortController.signal }),
          taskAPI.getListTask(id, { signal: abortController.signal })
        ])
        if (response && response.length > 0) {
          response[0] && setDetailProject(response[0].data)
          setTaskList(response[1].data)
        }
      } catch (error: Dennis) {
        console.error(error)
      } finally {
        closeLoading()
      }
    },
    [abortController]
  )

  return (
    <ProjectChildrenContext.Provider
      value={{
        detailProject,
        taskList,
        getDetailProjectAndTasks,
        abortController
      }}
    >
      {props.children}
    </ProjectChildrenContext.Provider>
  )
}

export const ProjectChildrenConsumer = ProjectChildrenContext.Consumer

export const useProjectChildrenContext = () => useContext(ProjectChildrenContext)
