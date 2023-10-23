import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { TableRowSelection } from 'antd/es/table/interface'
import { useState } from 'react'

interface IStudentRowData {
  key: React.Key
  studentCode: number
  name: string
  dateOfBirth: string
  class: string
  phoneNumber: string
  email: string
}

const data: IStudentRowData[] = []
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    studentCode: i + 200000,
    name: `Dennis Dang ${i}`,
    dateOfBirth: '01/01/2000',
    class: `IT ${i}`,
    phoneNumber: '0987654321',
    email: `dennis_${i}@email.com`
  })
}

function Students() {
  const columns: ColumnsType<IStudentRowData> = [
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
  ]
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection: TableRowSelection<IStudentRowData> = {
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

  const onOpenPanel = (record: IStudentRowData) => {
    console.log(record)
  }
  return (
    <div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  )
}

export default Students
