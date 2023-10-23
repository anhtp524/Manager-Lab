import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { ITeacher, dataProject } from '../ultis'

function TableTeacherProject() {
  const columnsTeacherProject: ColumnsType<ITeacher> = [
    {
      title: 'Name',
      dataIndex: 'nameTeacher'
    },
    {
      title: 'Major',
      dataIndex: 'major'
    }
  ]
  return (
    <div>
      <Table columns={columnsTeacherProject} dataSource={dataProject.teacher} />
    </div>
  )
}

export default TableTeacherProject
