import { Table, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table/interface'
import { useMemo } from 'react'
import { Project, ProjectList } from '~/api/project.api'
import { TaskStatus } from '~/api/task.api'
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

export const convertTaskStatusToValue = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.New:
      return <Tag color='blue'>New</Tag>
    case TaskStatus.Resolve:
      return <Tag color='orange'>Resolve</Tag>
    case TaskStatus.Pass:
      return <Tag color='green'>Pass</Tag>

    default:
      return <span>N/A</span>
  }
}

function Projects({ data }: { data?: ProjectList }) {
  const columns: ColumnsType<Project> = useMemo(
    () => [
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
    ],
    []
  )

  return (
    <div>
      <Table columns={columns} dataSource={data} bordered />
    </div>
  )
}

export default Projects
