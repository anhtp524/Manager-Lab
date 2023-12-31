import { Button, Modal, Space, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { TableRowSelection } from 'antd/es/table/interface'
import { useMemo, useState } from 'react'
import studentAPI, { DetailStudent, ListStudent } from '~/api/student.api'
import { useHandlingApi } from '~/common/context/useHandlingApi'
import DetailPanel from './common/DetailPanel'
import { useParams } from 'react-router-dom'
import { useAuth } from '~/common/context/useAuth'
import { Role } from '~/routes/util'
import { useLabContext } from '../LabContext'
import { toast } from 'react-toastify'

function Students({ data }: { data?: ListStudent }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  // const [studentList, setStudentList] = useState<ListStudent>([])
  const [open, setOpen] = useState<boolean>(false)
  const [studentDetail, setStudentDetail] = useState<DetailStudent | undefined>(undefined)
  const { showLoading, closeLoading } = useHandlingApi()
  const { authInfo } = useAuth()
  const { id } = useParams()
  const { getById } = useLabContext()
  const columns: ColumnsType<DetailStudent> = useMemo(
    () =>
      authInfo?.roles !== Role.Student
        ? [
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
              render: (_, record) => (
                <Space size='middle'>
                  <Button type='primary' onClick={() => onDelete(record.id)}>
                    Remove
                  </Button>
                </Space>
              )
            }
          ]
        : [
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
    [authInfo]
  )

  if (authInfo?.roles !== Role.Student) {
    columns.push()
  }

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

  const handleDelete = async (studentId: GUID) => {
    if (!id) return
    showLoading()
    try {
      const response = await studentAPI.removeFromLab({ studentId: studentId })
      if (response && response.data) {
        closeLoading()
        getById(id)
        toast.success('Successfully removed!', { autoClose: 2000 })
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
      <Table columns={columns} dataSource={data} bordered />
      <DetailPanel open={open} onClose={onClose} data={studentDetail} type='student' />
    </div>
  )
}

export default Students
