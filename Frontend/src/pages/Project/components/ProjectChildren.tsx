import { Button, Space, Table, Tabs } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'
import TableStudentProject from './TableStudentProject'
import TableTeacherProject from './TableTeacherProject'
import { useEffect, useMemo, useState } from 'react'
import projectAPI, { DetailProject } from '~/api/project.api'
import { useParams } from 'react-router-dom'
import { useHandlingApi } from '~/common/context/useHandlingApi'
import { ListTask, Task } from '~/api/task.api'
import { ColumnsType } from 'antd/es/table'
import { convertTaskStatusToValue } from '~/pages/Labs/components/Projects'

function ProjectChildren() {
  const { id } = useParams()
  const { showLoading, closeLoading } = useHandlingApi()
  const [detailProject, setDetailProject] = useState<DetailProject | undefined>(undefined)
  const [taskList, setTaskList] = useState<ListTask>([])

  const columnProjectList: ColumnsType<Task> = useMemo(
    () => [
      {
        title: 'Title',
        dataIndex: 'title',
        render: (text, record) => {
          return <a onClick={() => {}}>{text}</a>
        }
      },
      {
        title: 'Status',
        dataIndex: 'status',
        render: (status) => {
          return convertTaskStatusToValue(status)
        }
      }
    ],
    []
  )

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    const handleGetDetailProject = async () => {
      if (id === undefined || id === null) {
        return
      }
      showLoading()
      try {
        const response = await projectAPI.getById(id, { signal: signal })
        if (response && response.data) {
          setDetailProject(response.data)
        }
      } catch (error: Dennis) {
        console.error(error)
      } finally {
        closeLoading()
      }
    }

    handleGetDetailProject()

    return () => {
      abortController.abort()
    }
  }, [])

  const onCreateTask = () => {}
  return (
    <div className='project-children'>
      <div className='project-children-content-top'>
        <div className='title'>
          Project: <strong>{detailProject?.name}</strong>
        </div>
      </div>
      <div className='tab-lab-details'>
        <Tabs defaultActiveKey='1'>
          <TabPane tab={<span>Student</span>} key='1'>
            <TableStudentProject data={detailProject?.students} />
          </TabPane>
          <TabPane tab={<span>Teacher</span>} key='2'>
            <TableTeacherProject data={detailProject?.teachers} />
          </TabPane>
        </Tabs>
        <div style={{ marginTop: 24 }}>
          <Space size='small' direction='vertical' style={{ marginBottom: 12 }}>
            <Button type='primary' onClick={onCreateTask}>
              Create Task
            </Button>
          </Space>
          <Table showHeader={false} columns={columnProjectList} dataSource={taskList} bordered />
        </div>
      </div>
    </div>
  )
}

export default ProjectChildren
