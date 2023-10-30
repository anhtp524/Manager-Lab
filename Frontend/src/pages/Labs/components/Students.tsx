import { Button, Modal, Space, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { TableRowSelection } from 'antd/es/table/interface'
import { useEffect, useMemo, useState } from 'react'
import studentAPI, { DetailStudent, ListStudent } from '~/api/student.api'
import { useHandlingApi } from '~/common/context/useHandlingApi'
import DetailPanel from './common/DetailPanel'
import { useParams } from 'react-router-dom'
import { useAuth } from '~/common/context/useAuth'

function Students() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [studentList, setStudentList] = useState<ListStudent>([])
  const [open, setOpen] = useState<boolean>(false)
  const [studentDetail, setStudentDetail] = useState<DetailStudent | undefined>(undefined)
  const { showLoading, closeLoading } = useHandlingApi()
  const { profileUserInfo, setProfileUserInfo } = useAuth()
  const { id } = useParams()

  const columns: ColumnsType<DetailStudent> = useMemo(
    () => [
      {
        title: 'Student Code',
        dataIndex: 'studentCode',
        width: 150
      },
      {
        title: 'Name',
        dataIndex: 'name',
        width: 300,
        onCell: (record) => {
          return {
            onClick: () => onOpenPanel(record)
          }
        },
        render: (value) => {
          return (
            <a
              href=''
              onClick={(e) => {
                e.preventDefault()
              }}
            >
              {value}
            </a>
          )
        }
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
        dataIndex: 'email'
      },
      {
        title: '',
        render: (_, record) => (
          <Space size='middle'>
            <Button type='primary' onClick={() => onDelete(record.id)}>
              Remove
            </Button>
          </Space>
        )
      }
    ],
    []
  )
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    const handleGetAllStudent = async () => {
      if (id === undefined || id === null) return
      try {
        showLoading()
        const response = await studentAPI.getStudentInLab(id, { signal: signal })
        if (response.data) {
          setStudentList(response.data)
        }
      } catch (error) {
        console.error(error)
      } finally {
        closeLoading()
      }
    }

    handleGetAllStudent()
    return () => {
      abortController.abort()
    }
  }, [profileUserInfo?.lab])

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection: TableRowSelection<DetailStudent> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = []
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false
            }
            return true
          })
          setSelectedRowKeys(newSelectedRowKeys)
        }
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = []
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true
            }
            return false
          })
          setSelectedRowKeys(newSelectedRowKeys)
        }
      }
    ]
  }

  const onDelete = (id: GUID) => {
    Modal.confirm({
      title: 'Remove from lab?',
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

  const onOpenPanel = async (record: DetailStudent) => {
    try {
      showLoading()
      const response = await studentAPI.getStudentById(record.id)
      if (response && response.data) {
        setOpen(true)
        setStudentDetail(response.data)
        closeLoading()
      }
    } catch (error: Dennis) {
      console.error(error)
    } finally {
      closeLoading()
    }
  }

  const onClose = () => {
    setOpen(false)
  }
  return (
    <div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={studentList} bordered />
      <DetailPanel open={open} onClose={onClose} data={studentDetail} type='student' />
    </div>
  )
}

export default Students
