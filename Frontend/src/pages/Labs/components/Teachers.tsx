import { Table } from 'antd'
import { ColumnsType, TableRowSelection } from 'antd/es/table/interface'
import React, { useState } from 'react'

interface ITeacherRowData {
  key: React.Key
  name: string
  dateOfBirth: string
  department: string
  major: string
  phoneNumber: string
  email: string
}

const columns: ColumnsType<ITeacherRowData> = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: 200
  },
  {
    title: 'Date Of Birth',
    dataIndex: 'dateOfBirth',
    width: 150
  },
  {
    title: 'Department',
    dataIndex: 'department',
    width: 150
  },
  {
    title: 'Major',
    dataIndex: 'major',
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

const data: ITeacherRowData[] = []
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Roy Vu ${i}`,
    dateOfBirth: '01/01/2000',
    department: `T-IT ${i}`,
    major: 'Computer Science',
    phoneNumber: '0987654321',
    email: `roy_${i}@email.com`
  })
}
function Teachers() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection: TableRowSelection<ITeacherRowData> = {
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
  return (
    <div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} scroll={{ y: 400 }} />
    </div>
  )
}

export default Teachers
