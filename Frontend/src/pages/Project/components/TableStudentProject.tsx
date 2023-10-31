import React from 'react'
import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { StudentInProject } from '~/api/project.api'

export type ITableStudentProjectProps = {
  data: StudentInProject[] | undefined
}

function TableStudentProject(props: ITableStudentProjectProps) {
  const { data } = props
  const columnsStudentProject: ColumnsType<StudentInProject> = [
    {
      title: 'MSSV',
      dataIndex: 'msv'
    },
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Class',
      dataIndex: 'class'
    }
  ]
  return (
    <div>
      <Table columns={columnsStudentProject} dataSource={data} />
    </div>
  )
}

export default TableStudentProject
