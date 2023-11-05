import { GoogleOutlined, PhoneOutlined } from '@ant-design/icons'
import { Button, Collapse, CollapseProps, Modal, Tabs, TabsProps, Tag } from 'antd'
import { Projects, Students, Teachers } from './components'
import { useEffect, useMemo, useState } from 'react'
import { useHandlingApi } from '~/common/context/useHandlingApi'
import { useParams } from 'react-router-dom'
import labAPI, { Lab } from '~/api/lab.api'
import { useAuth } from '~/common/context/useAuth'
import studentAPI from '~/api/student.api'
import { Role } from '~/routes/util'
import PendingApproved from './components/PendingApproved'

const LabDetail = () => {
  const { authInfo, profileUserInfo, setProfileUserInfo } = useAuth()
  const { id } = useParams()

  const [labDetail, setLabDetail] = useState<Lab | undefined>(undefined)
  const items: CollapseProps['items'] = useMemo(
    () => [
      {
        key: 1,
        label:
          authInfo?.roles !== Role.Student ? (
            <span className='header'>{labDetail?.name}</span>
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
                <p>Trưởng phòng</p>
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
    [labDetail]
  )

  const tabList = [
    {
      key: '1',
      label: 'Students',
      children: <Students />
    },
    {
      key: '2',
      label: 'Teachers',
      children: <Teachers />
    },
    {
      key: '3',
      label: 'Projects',
      children: <Projects />
    }
  ]

  const tabs: TabsProps['items'] = useMemo(() => {
    if (authInfo?.roles === Role.Student) {
      return tabList
    }
    return [
      ...tabList,
      {
        key: '4',
        label: 'Pending approved',
        children: <PendingApproved />
      }
    ]
  }, [])

  const { showLoading, closeLoading } = useHandlingApi()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    const handleGetLabById = async () => {
      if (id === undefined || id === null) {
        return
      }
      showLoading()
      try {
        const response = await labAPI.getLabById(id, { signal: signal })
        if (response && response.data) {
          setLabDetail(response.data)
        }
      } catch (error: Dennis) {
        console.error(error)
      } finally {
        closeLoading()
      }
    }

    handleGetLabById()

    return () => {
      abortController.abort()
    }
  }, [profileUserInfo?.lab])

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
          onOk: () => setProfileUserInfo(response.data)
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
      {(authInfo?.roles !== Role.Student || (profileUserInfo?.lab?.id === id && profileUserInfo?.isApproveToLab)) && (
        <div className='tab-lab-details'>
          <Tabs defaultActiveKey='2' destroyInactiveTabPane items={tabs} onChange={() => showLoading()} />
        </div>
      )}
    </div>
  )
}

export default LabDetail
