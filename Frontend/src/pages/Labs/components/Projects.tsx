import { Table, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table/interface'
import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import projectAPI, { Project, ProjectList } from '~/api/project.api'
import { useHandlingApi } from '~/common/context/useHandlingApi'
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

function Projects() {
  const { showLoading, closeLoading } = useHandlingApi()
  const { id } = useParams()

  const [projectList, setProjectList] = useState<ProjectList>([])

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
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    const handleGetProjectInLab = async () => {
      if (id === undefined) return
      try {
        showLoading()
        const response = await projectAPI.getProjectInLab(id, { signal: signal })
        if (response.data) {
          setProjectList(response.data)
        }
      } catch (error) {
        console.error(error)
      } finally {
        closeLoading()
      }
    }

    handleGetProjectInLab()
    return () => {
      abortController.abort()
    }
  }, [])
  return (
    <div>
      <Table columns={columns} dataSource={projectList} />
    </div>
  )
}

export default Projects
