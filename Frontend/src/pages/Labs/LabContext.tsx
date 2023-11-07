import { createContext, useCallback, useContext, useState } from 'react'
import labAPI, { Lab } from '~/api/lab.api'
import projectAPI, { ProjectList } from '~/api/project.api'
import studentAPI, { ListPendingStudent, ListStudent } from '~/api/student.api'
import teacherAPI, { ListTeacher } from '~/api/teacher.api'
import { useAuth } from '~/common/context/useAuth'
import { useHandlingApi } from '~/common/context/useHandlingApi'
import { Role } from '~/routes/util'

export interface ILabContext extends GlobalContext {
  labDetail?: Lab
  teacherList?: ListTeacher
  studentList?: ListStudent
  projectList?: ProjectList
  pendingApproveList?: ListPendingStudent
  getById: (id: GUID) => void
}

export interface IProps {
  children?: React.ReactNode
}

export const LabContext = createContext<ILabContext>({
  labDetail: undefined,
  teacherList: [],
  studentList: [],
  projectList: [],
  pendingApproveList: [],
  getById: () => 1
})

export const LabProvider = (props: IProps) => {
  const [abortController] = useState<AbortController>(new AbortController())
  const { showLoading, closeLoading } = useHandlingApi()
  const { authInfo, profileUserInfo } = useAuth()
  const [labDetail, setLabDetail] = useState<Lab>()
  const [teacherList, setTeacherList] = useState<ListTeacher>([])
  const [studentList, setStudentList] = useState<ListStudent>([])
  const [projectList, setProjectList] = useState<ProjectList>([])
  const [pendingApproveList, setPendingApproveList] = useState<ListPendingStudent>([])
  const handleGetLabById = useCallback(
    async (id: GUID) => {
      showLoading()
      try {
        const isAdminRole = authInfo?.roles === Role.Admin
        const isTeacherRoleHasLab = authInfo?.roles === Role.Teacher && profileUserInfo?.lab?.id === id
        const isStudentRoleHasLab =
          authInfo?.roles === Role.Student && profileUserInfo?.lab?.id === id && profileUserInfo?.isApproveToLab
        const canSeeLabDetail = isAdminRole || isTeacherRoleHasLab || isStudentRoleHasLab
        const canSeePendingApprove = isAdminRole || isTeacherRoleHasLab
        const response = await Promise.all([
          labAPI.getLabById(id, { signal: abortController.signal }),
          canSeeLabDetail ? teacherAPI.getAllTeacherInLab(id, { signal: abortController.signal }) : null,
          canSeeLabDetail ? studentAPI.getStudentInLab(id, { signal: abortController.signal }) : null,
          canSeeLabDetail ? projectAPI.getProjectInLab(id, { signal: abortController.signal }) : null,
          canSeePendingApprove ? studentAPI.getStudentRegisterInLab(id, { signal: abortController.signal }) : null
        ])
        if (response && response.length > 0) {
          setLabDetail(response[0].data)
          response[1] && setTeacherList(response[1].data)
          response[2] && setStudentList(response[2].data)
          response[3] && setProjectList(response[3].data)
          response[4] && setPendingApproveList(response[4].data)
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
    <LabContext.Provider
      value={{
        labDetail: labDetail,
        teacherList,
        studentList,
        projectList,
        pendingApproveList,
        getById: handleGetLabById,
        abortController
      }}
    >
      {props.children}
    </LabContext.Provider>
  )
}

export const LabConsumer = LabContext.Consumer

export const useLabContext = () => useContext(LabContext)
