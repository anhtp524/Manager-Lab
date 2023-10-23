import { Button, Drawer, Space, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { TableRowSelection } from 'antd/es/table/interface'
import { useEffect, useMemo, useState } from 'react'
import studentAPI, { DetailStudent, ListStudent } from '~/api/student.api'

// export interface IStudentRowData {
//   key: React.Key
//   studentCode: number
//   name: string
//   dateOfBirth: string
//   class: string
//   phoneNumber: string
//   email: string
// }

// const data: IStudentRowData[] = []
// for (let i = 0; i < 46; i++) {
//   data.push({
//     key: i,
//     studentCode: i + 200000,
//     name: `Dennis Dang ${i}`,
//     dateOfBirth: '01/01/2000',
//     class: `IT ${i}`,
//     phoneNumber: '0987654321',
//     email: `dennis_${i}@email.com`
//   })
// }

function Students() {
  const columns: ColumnsType<DetailStudent> = useMemo(
    () => [
      {
        title: 'Student Code',
        dataIndex: 'studentCode',
        width: 150,
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
        title: 'Name',
        dataIndex: 'name',
        width: 300
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

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    const handleGetAllStudent = async () => {
      try {
        const response = await studentAPI.getAll({ signal: signal })
        if (response.data && response.data.length > 0) {
          setStudentList(response.data)
        }
      } catch (error) {
        console.error(error)
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

  const onOpenPanel = (record: DetailStudent) => {
    console.log(record)
    setOpen(true)
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
        width={500}
        onClose={onClose}
        open={open}
        keyboard={false}
        maskClosable={false}
        motion={{ motionDeadline: 0 }}
        headerStyle={{ flexDirection: 'row-reverse' }}
        closeIcon
        footer={
          <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
            <Button onClick={onClose} type='primary'>
              OK
            </Button>
          </Space>
        }
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </div>
  )
}

export default Students
