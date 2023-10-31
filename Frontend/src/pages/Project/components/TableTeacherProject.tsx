import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { TeacherInProject } from '~/api/project.api'

export type TableTeacherProjectProps = {
  data: TeacherInProject[] | undefined
}

function TableTeacherProject({ data }: TableTeacherProjectProps) {
  const columnsTeacherProject: ColumnsType<TeacherInProject> = [
    {
      title: 'Name',
      dataIndex: 'name'
    }
  ]
  return (
    <div>
      <Table columns={columnsTeacherProject} dataSource={data} />
    </div>
  )
}

export default TableTeacherProject
