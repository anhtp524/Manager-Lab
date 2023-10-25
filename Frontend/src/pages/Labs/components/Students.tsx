import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Drawer, Space, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { TableRowSelection } from 'antd/es/table/interface'
import { useEffect, useMemo, useState } from 'react'
import studentAPI, { DetailStudent, ListStudent } from '~/api/student.api'
import Lazyloading from '~/common/components/lazyloading/Lazyloading'
import { useHandlingApi } from '~/common/context/useHandlingApi'

function Students() {
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
      }
    ],
    []
  )
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [studentList, setStudentList] = useState<ListStudent>([])
  const [open, setOpen] = useState<boolean>(false)
  const [studentDetail, setStudentDetail] = useState<DetailStudent | undefined>(undefined)
  const { showLoading, closeLoading, showError } = useHandlingApi()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    const handleGetAllStudent = async () => {
      try {
        showLoading()
        const response = await studentAPI.getAll({ signal: signal })
        if (response.data && response.data.length > 0) {
          setStudentList(response.data)
          closeLoading()
        }
      } catch (error) {
        console.error(error)
        showError()
      }
    }

    handleGetAllStudent()
    return () => {
      abortController.abort()
    }
  }, [])

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
      showError()
      console.error(error)
    }
  }

  const onClose = () => {
    setOpen(false)
  }
  return (
    <div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={studentList} />
      <Drawer
        title='View student information'
        className='student-detail-info'
        placement='right'
        width={700}
        onClose={onClose}
        open={open}
        keyboard={false}
        maskClosable={false}
        motion={{ motionDeadline: 0 }}
        headerStyle={{ flexDirection: 'row-reverse' }}
        footer={
          <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
            <Button onClick={onClose} type='primary'>
              OK
            </Button>
          </Space>
        }
      >
        <div>
          <div className='student-avatar'>
            <Avatar size={160} icon={<UserOutlined />} gap={0} />
            <span>{studentDetail?.name}</span>
          </div>
          <div className='student-info'></div>
        </div>
      </Drawer>
    </div>
  )
}

export default Students
