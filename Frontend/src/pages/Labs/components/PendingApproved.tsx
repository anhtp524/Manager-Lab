import { Button, Modal, Space, Table, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table/interface'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import studentAPI, { ListPendingStudent, PendingStudent } from '~/api/student.api'
import { useAuth } from '~/common/context/useAuth'
import { useHandlingApi } from '~/common/context/useHandlingApi'
import { ProjectStatus } from '~/routes/util'

export const convertStatusEnumToValue = (status: ProjectStatus) => {
  switch (status) {
    case ProjectStatus.UnConfirm:
      return <Tag color='default'>Unconfirm</Tag>
    case ProjectStatus.New:
      return <Tag color='green'>New</Tag>
    case ProjectStatus.OnGoing:
      return <Tag color='orange'>On going</Tag>
    case ProjectStatus.Finish:
      return <Tag color='blue'>Finished</Tag>
    case ProjectStatus.Cancel:
      return <Tag color='red'>Cancelled</Tag>
    default:
      return <span>N/A</span>
  }
}

function PendingApproved() {
  const { showLoading, closeLoading } = useHandlingApi()
  const { profileUserInfo, setProfileUserInfo } = useAuth()
  const { id } = useParams()

  const [pendingApprovedList, setPendingApprovedList] = useState<ListPendingStudent>([])

  const columns: ColumnsType<PendingStudent> = useMemo(
    () => [
      {
        title: 'Student Code',
        dataIndex: 'studentCode',
        width: 150
      },
      {
        title: 'Name',
        dataIndex: 'name',
        width: 230
      },
      {
        title: 'Date Of Birth',
        dataIndex: 'dateOfBirth',
        width: 150
      },
      {
        title: 'Class',
        dataIndex: 'class',
        width: 150
      },
      {
        title: 'Phone Number',
        dataIndex: 'phoneNumber',
        width: 150
      },
      {
        title: 'Email',
        dataIndex: 'email',
        width: 230
      },
      {
        title: '',
        render: (_, record) => (
          <Space size='middle'>
            <Button type='primary' onClick={() => onApproveToLab(record.id)}>
              Approve
            </Button>
            <Button type='dashed' onClick={() => onDelete(record.id)}>
              Reject
            </Button>
          </Space>
        )
      }
    ],
    [profileUserInfo]
  )

  const onApproveToLab = (id: GUID) => {
    Modal.confirm({
      title: 'Approve this student to lab?',
      onOk: () => handleApprove(id)
    })
  }
  const handleApprove = async (id: GUID) => {
    showLoading()
    try {
      const response = await studentAPI.approveToLab({ studentId: id })
      if (response && response.data) {
        closeLoading()
        Modal.success({
          title: 'Successfully approved!',
          onOk: () => setProfileUserInfo(response.data)
        })
      }
    } catch (error: Dennis) {
      console.error(error)
    }
  }

  const onDelete = (id: GUID) => {
    Modal.confirm({
      title: 'Reject from lab?',
      onOk: () => handleDelete(id)
    })
  }

  const handleDelete = async (id: GUID) => {
    showLoading()
    try {
      const response = await studentAPI.removeFromLab({ studentId: id })
      if (response && response.data) {
        closeLoading()

        Modal.success({
          title: 'Successfully removed!',
          onOk: () => setProfileUserInfo(response.data)
        })
      }
    } catch (error: Dennis) {
      console.error(error)
    }
  }
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    const handleGetRegisterInLab = async () => {
      if (id === undefined) return
      try {
        showLoading()
        const response = await studentAPI.getStudentRegisterInLab(id, { signal: signal })
        if (response.data) {
          setPendingApprovedList(response.data)
        }
      } catch (error) {
        console.error(error)
      } finally {
        closeLoading()
      }
    }

    handleGetRegisterInLab()
    return () => {
      abortController.abort()
    }
  }, [profileUserInfo?.lab])

  return (
    <div>
      <Table columns={columns} dataSource={pendingApprovedList} />
    </div>
  )
}

export default PendingApproved
