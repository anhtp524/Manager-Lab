import { GoogleOutlined, PhoneOutlined } from '@ant-design/icons'
import { Button, Collapse, CollapseProps, Modal, Tabs, TabsProps, Tag } from 'antd'
import { Projects, Students, Teachers } from './components'
import { useEffect, useMemo, useState } from 'react'
import { useHandlingApi } from '~/common/context/useHandlingApi'
import { useParams } from 'react-router-dom'
import { useAuth } from '~/common/context/useAuth'
import studentAPI from '~/api/student.api'
import { Role } from '~/routes/util'
import PendingApproved from './components/PendingApproved'
import teacherAPI, { ListTeacher } from '~/api/teacher.api'
import SelectNoLabTeacher from './components/common/SelectNoLabTeacher'
import { toast } from 'react-toastify'
import { useLabContext } from './LabContext'
import { Lab } from '~/api/lab.api'

const LabDetail = () => {
  const { authInfo, profileUserInfo, setProfileUserInfo } = useAuth()
  const { labDetail, getById, teacherList, studentList, abortController, projectList, pendingApproveList } =
    useLabContext()
  const { id } = useParams()

  const [teacherId, setTeacherId] = useState<GUID>('')
  const [showSelectTeacher, setShowSelectTeacher] = useState<boolean>(false)
  const [teacherNoLab, setTeacherNoLab] = useState<ListTeacher>([])
  const items: CollapseProps['items'] = useMemo(
    () => [
      {
        key: 1,
        label:
          authInfo?.roles !== Role.Student ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span className='header'>{labDetail?.name}</span>
              {labDetail?.isLabHead && (
                <Button type='primary' onClick={handleGetTeacherNoLab}>
                  Add teacher
                </Button>
              )}
            </div>
          ) : profileUserInfo?.lab ? (
            profileUserInfo.lab.id === id ? (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 12 }}>
                  <span className='header'>{labDetail?.name}</span>
                  {!profileUserInfo.isApproveToLab && <Tag color='blue'>Waiting for approve</Tag>}
                </div>
                {!profileUserInfo.isApproveToLab && (
                  <Button type='primary' onClick={onWithDrawFromLab}>
                    Withdraw
                  </Button>
                )}
              </div>
            ) : (
              <span className='header'>{labDetail?.name}</span>
            )
          ) : (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className='header'>{labDetail?.name}</span>
              <Button type='primary' onClick={onRegisterToLab}>
                Register to this lab
              </Button>
            </div>
          ),
        children: (
          <div>
            <div className='profile'>
              <div className='profileuser'>
                <img src='https://sep.hust.edu.vn/wp-content/uploads/002.065.00001.jpg' alt='' />
                <p>{labDetail?.teacher.name}</p>
              </div>
              <div className='profilefuntion'>
                <div>
                  <span>CHỨC NĂNG/NHIỆM VỤ:</span>
                  <ul>
                    <li>Nghiên cứu các hệ vật liệu cấu trúc nano ứng dụng trong y-sinh-nông-môi trường</li>
                    <li>Phát triển và tối ưu các quy trình công nghệ trong lĩnh vực nghiên cứu</li>
                  </ul>
                </div>
                <div>
                  <span>HƯỚNG NGHIÊN CỨU CHÍNH:</span>
                  <ul>
                    <li>Nghiên cứu các hệ vật liệu cấu trúc nano ứng dụng trong y-sinh-nông-môi trường</li>
                    <li>Phát triển và tối ưu các quy trình công nghệ trong lĩnh vực nghiên cứu</li>
                  </ul>
                </div>
                <div className='contact'>
                  <div>
                    <GoogleOutlined />
                    o0othanh2k1@gmail.com
                  </div>
                  <div>
                    <PhoneOutlined />
                    0335138003
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    ],
    [authInfo, id, labDetail, profileUserInfo]
  )

  const { showLoading, closeLoading } = useHandlingApi()

  useEffect(() => {
    if (id === undefined) return

    getById(id)

    return () => {
      abortController?.abort()
    }
  }, [])

  const tabList = useMemo(
    () => [
      {
        key: '1',
        label: 'Students',
        children: <Students data={studentList} />
      },
      {
        key: '2',
        label: 'Teachers',
        children: <Teachers labDetail={labDetail as Lab} data={teacherList} />
      },
      {
        key: '3',
        label: 'Projects',
        children: <Projects data={projectList} />
      }
    ],
    [labDetail]
  )

  const tabs: TabsProps['items'] = useMemo(() => {
    if (authInfo?.roles === Role.Student) {
      return tabList
    }
    return [
      ...tabList,
      {
        key: '4',
        label: 'Pending approved',
        children: <PendingApproved data={pendingApproveList} />
      }
    ]
  }, [authInfo, tabList])

  async function handleGetTeacherNoLab() {
    showLoading()
    try {
      const response = await teacherAPI.getTeacherNoLab()
      if (response && response.data) {
        setShowSelectTeacher(true)
        setTeacherNoLab(
          response.data.map((x) => {
            return { ...x, key: x.id }
          })
        )
      }
    } catch (error: Dennis) {
      console.error(error)
    } finally {
      closeLoading()
    }
  }

  const getTeacherId = (id: GUID) => {
    setTeacherId(id)
  }

  const handleAddTeacher = async (teacherId: GUID) => {
    if (!id) return
    showLoading()
    try {
      const response = await teacherAPI.addTeacherToLab({ teacherId: teacherId, labId: id })
      if (response && response.data) {
        toast.success('Successfully added!')
        getById(id)
        setShowSelectTeacher(false)
      }
    } catch (error: Dennis) {
      console.error(error)
    } finally {
      closeLoading()
    }
  }

  function onRegisterToLab() {
    Modal.confirm({
      title: 'Apply to this laboratory?',
      onOk: handleRegisterToLab
    })
  }

  const handleRegisterToLab = async () => {
    if (id === null || id === undefined) {
      Modal.error({
        title: 'Invalid laboratory'
      })
      return
    }
    try {
      showLoading()
      const response = await studentAPI.registerToLab({ labId: id })
      if (response && response.data) {
        closeLoading()

        Modal.success({
          title: 'Successfully registered, please wait for result!',
          onOk: () => {
            setProfileUserInfo(response.data)
            getById(id)
          }
        })
      }
    } catch (error: Dennis) {
      console.error(error)
    }
  }

  function onWithDrawFromLab() {
    Modal.confirm({
      title: 'Withdraw your application?',
      onOk: handleWithDrawFromLab
    })
  }

  const handleWithDrawFromLab = async () => {
    if (id === null || id === undefined) {
      Modal.error({
        title: 'Invalid laboratory'
      })
      return
    }
    try {
      showLoading()
      const response = await studentAPI.withDrawFromLab({ labId: id })
      if (response && response.data) {
        closeLoading()

        Modal.success({
          title: 'Successfully withdrawn!',
          onOk: () => setProfileUserInfo(response.data)
        })
      }
    } catch (error: Dennis) {
      console.error(error)
    }
  }

  return (
    <div className='labdetail'>
      <Collapse items={items} defaultActiveKey={['1']} bordered={true} collapsible='icon' />
      {(authInfo?.roles === Role.Admin ||
        (authInfo?.roles === Role.Teacher && profileUserInfo?.lab?.id === id) ||
        (profileUserInfo?.lab?.id === id && profileUserInfo?.isApproveToLab)) && (
        <div className='tab-lab-details'>
          <Tabs defaultActiveKey='2' destroyInactiveTabPane items={tabs} />
        </div>
      )}
      <Modal
        open={showSelectTeacher}
        title='Select a teacher'
        centered={true}
        width='800px'
        okText='Add teacher'
        okButtonProps={{
          disabled: teacherNoLab.length === 0
        }}
        onOk={() => {
          if (!teacherId) return
          handleAddTeacher(teacherId)
        }}
        maskClosable={false}
        onCancel={() => {
          setShowSelectTeacher(false)
          setTeacherId('')
        }}
        destroyOnClose
      >
        <div style={{ width: '100%' }}>
          <SelectNoLabTeacher data={teacherNoLab} getTeacherId={getTeacherId} />
        </div>
      </Modal>
    </div>
  )
}

export default LabDetail
