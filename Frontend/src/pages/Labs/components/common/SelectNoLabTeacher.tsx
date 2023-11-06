import Table, { ColumnsType } from 'antd/es/table'
import { TableRowSelection } from 'antd/es/table/interface'
import React, { useMemo } from 'react'
import { DetailTeacher, ListTeacher } from '~/api/teacher.api'

interface ISelectNoLabTeacherProps {
  data: ListTeacher
  getTeacherId: (id: GUID) => void
}

function SelectNoLabTeacher({ data, getTeacherId }: ISelectNoLabTeacherProps) {
  const columns: ColumnsType<DetailTeacher> = useMemo(
    () => [
      {
        key: '1',
        title: 'Name',
        dataIndex: 'name',
        width: 200
      },
      {
        key: '2',
        title: 'Department',
        dataIndex: 'department',
        width: 200
      },
      {
        key: '3',
        title: 'Major',
        dataIndex: 'major'
      }
    ],
    []
  )

  const rowSelection: TableRowSelection<DetailTeacher> = {
    type: 'radio',
    onChange: (selectedRowKeys: React.Key[], selectedRows: ListTeacher) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
      getTeacherId(selectedRows[0]?.id)
    }
  }
  return <Table rowSelection={rowSelection} columns={columns} dataSource={data} bordered />
}

export default SelectNoLabTeacher
