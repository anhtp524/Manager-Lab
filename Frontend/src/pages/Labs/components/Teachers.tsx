import { Table } from 'antd'
import { ColumnsType, TableRowSelection } from 'antd/es/table/interface'
import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import teacherAPI, { DetailTeacher, ListTeacher } from '~/api/teacher.api'
import { useHandlingApi } from '~/common/context/useHandlingApi'
import DetailPanel from './common/DetailPanel'

function Teachers() {
  const columns: ColumnsType<DetailTeacher> = useMemo(
    () => [
      {
        title: 'Name',
        dataIndex: 'name',
        width: 200,
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
        title: 'Date Of Birth',
        dataIndex: 'dateOfBirth',
        width: 150
      },
      {
        title: 'Department',
        dataIndex: 'department',
        width: 200
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
    ],
    []
  )

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const [teacherDetail, setTeacherDetail] = useState<DetailTeacher | undefined>(undefined)
  const [teacherList, setTeacherList] = useState<ListTeacher>([])
  const { id } = useParams()
  const { showLoading, closeLoading } = useHandlingApi()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    const handleGetAllTeacherInLab = async () => {
      if (id === undefined) return
      try {
        showLoading()
        const response = await teacherAPI.getAllTeacherInLab(id, { signal: signal })
        if (response.data && response.data.length > 0) {
          setTeacherList(response.data)
        }
      } catch (error) {
        console.error(error)
      } finally {
        closeLoading()
      }
    }

    handleGetAllTeacherInLab()
    return () => {
      abortController.abort()
    }
  }, [])

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection: TableRowSelection<DetailTeacher> = {
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

  const onOpenPanel = async (record: DetailTeacher) => {
    try {
      showLoading()
      const response = await teacherAPI.getTeacherById(record.id)
      if (response && response.data) {
        setOpen(true)
        setTeacherDetail(response.data)
      }
    } catch (error: Dennis) {
      console.error(error)
    } finally {
      closeLoading()
    }
  }

  const onClose = () => {
    setOpen(false)
  }
  return (
    <div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={teacherList} bordered />
      <DetailPanel open={open} onClose={onClose} data={teacherDetail} type='teacher' />
    </div>
  )
}

export default Teachers
