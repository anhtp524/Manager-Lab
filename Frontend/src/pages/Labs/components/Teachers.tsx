import { Button, Modal, Table } from 'antd'
import { ColumnsType, TableRowSelection } from 'antd/es/table/interface'
import React, { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import teacherAPI, { DetailTeacher, ListTeacher } from '~/api/teacher.api'
import { useHandlingApi } from '~/common/context/useHandlingApi'
import DetailPanel from './common/DetailPanel'
import { toast } from 'react-toastify'
import { Lab } from '~/api/lab.api'
import { useLabContext } from '../LabContext'
import { useAuth } from '~/common/context/useAuth'

function Teachers({ labDetail, data }: { labDetail?: Lab; data?: ListTeacher }) {
  const staticColumns = [
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
  ]
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const [teacherDetail, setTeacherDetail] = useState<DetailTeacher | undefined>(undefined)
  // const [teacherList, setTeacherList] = useState<ListTeacher>([])
  const { id } = useParams()
  const { getById } = useLabContext()
  const { showLoading, closeLoading } = useHandlingApi()
  const { profileUserInfo } = useAuth()

  // useEffect(() => {
  //   if (id === undefined) return
  //   getAll(id)
  //   return () => {
  //     abortController?.abort()
  //   }
  // }, [labDetail])

  const columns: ColumnsType<DetailTeacher> = useMemo(
    () =>
      !labDetail?.isLabHead
        ? [
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
            ...staticColumns
          ]
        : [
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
            ...staticColumns,
            {
              render: (_, record) => {
                if (record.id === profileUserInfo?.id) return null
                return (
                  <Button type='primary' onClick={() => onRemoveTeacher({ teacherId: record.id })}>
                    Remove
                  </Button>
                )
              }
            }
          ],
    [labDetail, data]
  )

  const onRemoveTeacher = (body: { teacherId: GUID }) => {
    Modal.confirm({
      title: 'Remove this teacher?',
      onOk: () => handleRemoveTeacher(body)
    })
  }

  const handleRemoveTeacher = async (body: { teacherId: GUID }) => {
    if (id === undefined) return
    try {
      const response = await teacherAPI.deleteTeacher(body)
      if (response && response.data) {
        toast.success('Successfully deleted!')
        getById(id)
      }
    } catch (error: Dennis) {
      console.error(error)
    }
  }

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
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} bordered />
      <DetailPanel open={open} onClose={onClose} data={teacherDetail} type='teacher' />
    </div>
  )
}

export default Teachers
