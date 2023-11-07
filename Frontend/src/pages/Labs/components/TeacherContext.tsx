import { createContext, useCallback, useContext, useState } from 'react'
import teacherAPI, { ListTeacher } from '~/api/teacher.api'
import { useHandlingApi } from '~/common/context/useHandlingApi'

export interface ITeacherContext extends GlobalContext {
  teacherList?: ListTeacher
  getAll: (id: GUID) => void
}

export interface IProps {
  children?: React.ReactNode
}

export const TeacherContext = createContext<ITeacherContext>({
  teacherList: undefined,
  getAll: () => 1
})

export const TeacherProvider = (props: IProps) => {
  const [abortController] = useState<AbortController>(new AbortController())
  const { showLoading, closeLoading } = useHandlingApi()
  const [teacherList, setTeacherList] = useState<ListTeacher>()

  const handleGetTeacherList = useCallback(
    async (id: GUID) => {
      showLoading()
      try {
        const response = await teacherAPI.getAllTeacherInLab(id, { signal: abortController.signal })
        if (response && response.data) {
          setTeacherList(response.data)
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
    <TeacherContext.Provider value={{ teacherList, getAll: handleGetTeacherList, abortController }}>
      {props.children}
    </TeacherContext.Provider>
  )
}

export const TeacherConsumer = TeacherContext.Consumer

export const useTeacherContext = () => useContext(TeacherContext)
