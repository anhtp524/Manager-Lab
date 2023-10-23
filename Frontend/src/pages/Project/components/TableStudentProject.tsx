import React from 'react'
import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { IStudent, dataProject } from '../ultis'

function TableStudentProject() {
  const columnsStudentProject: ColumnsType<IStudent> = [
    {
      title: 'MSSV',
      dataIndex: 'studentCode'
    },
    {
      title: 'Name',
      dataIndex: 'nameStudent'
    },
    {
      title: 'Class',
      dataIndex: 'class'
    }
  ]
  return (
    <div>
      <Table columns={columnsStudentProject} dataSource={dataProject.student} />
    </div>
  )
}

export default TableStudentProject
