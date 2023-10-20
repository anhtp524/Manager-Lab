import { Table, Tag } from 'antd'
import { ColumnsType, TableRowSelection } from 'antd/es/table/interface'
import React, { useState } from 'react'
import { ProjectStatus } from '~/routes/util'

interface ITeacherRowData {
  key: React.Key
  name: string
  coreTech: string
  description: string
  status: ProjectStatus
}

const columns: ColumnsType<ITeacherRowData> = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: 300
  },
  {
    title: 'Core Technology',
    dataIndex: 'coreTech',
    width: 150
  },
  {
    title: 'Description',
    dataIndex: 'description',
    width: 150
  },
  {
    title: 'Status',
    dataIndex: 'status',
    width: 150,
    render: (status) => {
      return convertStatusEnumToValue(status)
    }
  }
]

const convertStatusEnumToValue = (status: ProjectStatus) => {
  switch (status) {
    case ProjectStatus.Draft:
      return <Tag color='default'>Draft</Tag>
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

const data: ITeacherRowData[] = [
  {
    key: 1,
    name: `Nghiên cứu, thiết kế, chế tạo thiết bị đo lường và theo dõi tín hiệu sinh học`,
    coreTech: `React`,
    description: '',
    status: ProjectStatus.Draft
  },
  {
    key: 2,
    name: `Thiết kế, chế tạo thiết bị nuôi cấy vi sinh vật`,
    coreTech: `React`,
    description: '',
    status: ProjectStatus.New
  },
  {
    key: 3,
    name: `Nghiên cứu các phương pháp thu nhận và truyền lên điện thoại di động các thông số sinh học của cơ thể người`,
    coreTech: `React`,
    description: '',
    status: ProjectStatus.OnGoing
  },
  {
    key: 4,
    name: `Nghiên cứu, thiết kế và chế tạo thiết bị hỗ trợ học tương tác BK-iclicker kết nối không dây`,
    coreTech: `React`,
    description: '',
    status: ProjectStatus.Finish
  },
  {
    key: 5,
    name: `Thiết kế bộ đảm bảo nguồn liên tục thông minh sử dụng Chip Atpiny13 công nghệ AVR ứng dụng trong các thiết kế y tế`,
    coreTech: `React`,
    description: '',
    status: ProjectStatus.Cancel
  }
]

function Projects() {
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
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  )
}

export default Projects
