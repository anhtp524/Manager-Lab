import { Button, Collapse, DatePicker, Drawer, Form, Input, Space, Table, Tabs, Upload } from 'antd'
import TableStudentProject from './TableStudentProject'
import TableTeacherProject from './TableTeacherProject'
import { useEffect, useMemo, useState } from 'react'
import projectAPI, { DetailProject } from '~/api/project.api'
import { useParams } from 'react-router-dom'
import { useHandlingApi } from '~/common/context/useHandlingApi'
import taskAPI, { ListTask, Task, TaskStatus } from '~/api/task.api'
import { ColumnsType } from 'antd/es/table'
import { convertTaskStatusToValue } from '~/pages/Labs/components/Projects'
import { FormInstance, useForm } from 'antd/es/form/Form'
import type { CollapseProps, TabsProps, UploadFile } from 'antd'
import documentAPI from '~/api/document.api'
import { useAuth } from '~/common/context/useAuth'
import { Role } from '~/routes/util'

function ProjectChildren() {
  const { id } = useParams()
  const [form] = useForm()
  const { authInfo } = useAuth()
  const { showLoading, closeLoading } = useHandlingApi()
  const [detailProject, setDetailProject] = useState<DetailProject | undefined>(undefined)
  const [taskList, setTaskList] = useState<ListTask>([])
  const [showCreate, setShowCreate] = useState<boolean>(false)
  const [showDetailTask, setShowDetailTask] = useState<boolean>(false)
  const [showInnerTask, setShowInnerTask] = useState<boolean>(false)
  const [detailTask, setDetailTask] = useState<Task | undefined>(undefined)
  const [outerPanelWidth, setOuterPanelWidth] = useState<number>(600)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [createTaskFileList, setCreateTaskFileList] = useState<UploadFile[]>([])
  const [createTaskFileIds, setCreateTaskFileIds] = useState<GUID[]>([])

  const tabList: TabsProps['items'] = useMemo(
    () => [
      {
        key: '1',
        label: 'Students',
        children: <TableStudentProject data={detailProject?.students} />
      },
      {
        key: '2',
        label: 'Teachers',
        children: <TableTeacherProject data={detailProject?.teachers} />
      }
    ],
    [detailProject?.students, detailProject?.teachers]
  )

  const items: CollapseProps['items'] = useMemo(
    () => [
      {
        key: 1,
        label: 'Members',
        children: <Tabs items={tabList}></Tabs>
      }
    ],
    [tabList]
  )

  const columnProjectList: ColumnsType<Task> = useMemo(
    () => [
      {
        title: 'Title',
        dataIndex: 'title',
        render: (text, record) => {
          return (
            <a
              onClick={() => {
                handleGetDetailTask(record.id)
              }}
            >
              {text}
            </a>
          )
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
        const response = await Promise.all([
          projectAPI.getById(id, { signal: signal }),
          taskAPI.getListTask(id, { signal: signal })
        ])
        const detailProject = response[0]
        const listTask = response[1]

        if (detailProject && detailProject.data) {
          setDetailProject(detailProject.data)
        }
        if (listTask && listTask.data) {
          setTaskList(listTask.data)
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

  const handleSubmit = async (form: FormInstance<Dennis>) => {
    showLoading()
    console.log(form.getFieldsValue())
    const requestBody = {
      ...form.getFieldsValue(),
      projectId: id,
      listFileId: createTaskFileIds
    }
    console.log(requestBody)
    try {
      const response = await taskAPI.createTask(requestBody)
      if (response && response.data) {
        form.resetFields()
        const newListTask = [...taskList]
        newListTask.push(response.data)
        setTaskList(newListTask)
        setShowCreate(false)
      }
    } catch (error: Dennis) {
      console.error(error)
    } finally {
      closeLoading()
    }
  }

  const handleGetDetailTask = async (id: GUID) => {
    showLoading()
    try {
      const response = await taskAPI.getById(id)
      if (response && response.data) {
        setShowDetailTask(true)
        setDetailTask(response.data)
      }
    } catch (error: Dennis) {
      console.error(error)
    } finally {
      closeLoading()
    }
  }

  // const normFile = (e: Dennis) => {
  //   console.log('Upload event:', e)
  //   if (Array.isArray(e)) {
  //     return e
  //   }
  //   return e?.fileList
  // }
  return (
    <div className='project-children'>
      <div className='project-children-content-top'>
        <div className='title'>
          Project: <strong>{detailProject?.name}</strong>
        </div>
      </div>
      <div className='tab-lab-details'>
        <Collapse items={items} defaultActiveKey={['1']} bordered={true} collapsible='icon' />
        <div style={{ marginTop: 24 }}>
          <p>List tasks</p>
          {authInfo?.roles !== Role.Student && (
            <Space size='small' direction='vertical' style={{ marginBottom: 12 }}>
              <Button type='primary' onClick={() => setShowCreate(true)}>
                Create Task
              </Button>
            </Space>
          )}
          {/* {(detailProject?.status as ProjectStatus) >= ProjectStatus.OnGoing && ( */}
          <Table showHeader={false} columns={columnProjectList} dataSource={taskList} bordered />
          {/* )} */}
        </div>
      </div>
      <Drawer
        title='Create a task'
        className='create-task-panel'
        placement='right'
        width={600}
        onClose={() => {
          form.resetFields()
          setShowCreate(false)
        }}
        open={showCreate}
        keyboard={false}
        maskClosable={false}
        headerStyle={{ flexDirection: 'row-reverse' }}
        footer={
          <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
            <Button
              onClick={() => {
                form.resetFields()
                setShowCreate(false)
              }}
              type='default'
            >
              Back
            </Button>
            <Button
              onClick={() => {
                form.submit()
              }}
              type='primary'
            >
              Save and create
            </Button>
          </Space>
        }
      >
        <Form form={form} name='create-task' scrollToFirstError onFinish={() => handleSubmit(form)}>
          <Form.Item
            name='title'
            rules={[
              {
                required: true
              }
            ]}
          >
            <div className='input-field task-title'>
              <div style={{ color: '#1F1F1F', fontWeight: '500' }}>Task title</div>
              <Input />
            </div>
          </Form.Item>

          <Form.Item
            name='content'
            rules={[
              {
                required: true
              }
            ]}
          >
            <div className='input-field task-content'>
              <div style={{ color: '#1F1F1F', fontWeight: '500' }}>Content</div>
              <Input.TextArea showCount maxLength={100} />
            </div>
          </Form.Item>

          <Form.Item
            name='dueDate'
            rules={[
              {
                required: true
              }
            ]}
          >
            <div className='input-field task-due-date'>
              <div style={{ color: '#1F1F1F', fontWeight: '500' }}>Due date</div>
              <DatePicker onChange={(_, dateString) => form.setFieldValue('dueDate', dateString)} />
            </div>
          </Form.Item>

          <Form.Item name='createTaskDocument' valuePropName='fileList'>
            <div className='info-container' style={{ marginTop: 12 }}>
              <div style={{ color: '#1F1F1F', fontWeight: '500' }}>Upload document (if need)</div>
              <Upload.Dragger
                name='files'
                maxCount={2}
                showUploadList={{
                  showDownloadIcon: true,
                  downloadIcon: 'Download',
                  showRemoveIcon: true
                }}
                fileList={createTaskFileList}
                listType='text'
                beforeUpload={async (file) => {
                  // const formData = new FormData()
                  // formData.append('file', file)
                  showLoading()
                  try {
                    const response = await documentAPI.upload({ folderPath: 'create/task', file: file })
                    if (response && response.data) {
                      const ids = [...createTaskFileIds]
                      ids.push(response.data.id)
                      setCreateTaskFileIds(ids)
                    }
                  } catch (error: Dennis) {
                    console.error(error)
                  } finally {
                    closeLoading()
                  }
                  return false
                }}
                onRemove={(file) => {
                  console.log(file)
                  const index = createTaskFileList.indexOf(file)
                  const newFileList = createTaskFileList.slice()
                  newFileList.splice(index, 1)
                  setCreateTaskFileList(newFileList)
                }}
                onChange={({ fileList }) => {
                  console.log(fileList)
                  setCreateTaskFileList(fileList)
                }}
              >
                <p className='ant-upload-text'>Click or drag file to this area to upload</p>
              </Upload.Dragger>
            </div>
          </Form.Item>
        </Form>
      </Drawer>
      <Drawer
        title='View detail task'
        className='view-detail-task'
        placement='right'
        width={outerPanelWidth}
        onClose={() => {
          setShowDetailTask(false)
        }}
        open={showDetailTask}
        keyboard={false}
        maskClosable={false}
        headerStyle={{ flexDirection: 'row-reverse' }}
        footer={
          <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
            <Button
              onClick={() => {
                setOuterPanelWidth(600)
                setShowDetailTask(false)
              }}
              type='default'
            >
              Back
            </Button>
            <Button type='primary' onClick={() => setShowInnerTask(true)}>
              View content and response
            </Button>
          </Space>
        }
      >
        <div className='info-container' style={{ marginTop: 0 }}>
          <div className='detail-info'>
            <div className='detail-left'>Task title</div>
            <div className='detail-right'>{detailTask?.title}</div>
          </div>
          <div className='detail-info'>
            <div className='detail-left'>Created date</div>
            <div className='detail-right'>{detailTask?.createDate}</div>
          </div>
          <div className='detail-info'>
            <div className='detail-left'>Due date</div>
            <div className='detail-right'>{detailTask?.dueDate}</div>
          </div>
          <div className='detail-info'>
            <div className='detail-left'>Status</div>
            <div className='detail-right'>{convertTaskStatusToValue(detailTask?.status as TaskStatus)}</div>
          </div>
          <div className='detail-content'>
            <div className='detail-content-title'>Content</div>
            <div className='detail-content-body'>{detailTask?.content}</div>
          </div>
        </div>
        <Drawer
          title='View detail content and response'
          className='view-detail-content-response'
          placement='right'
          width={800}
          onClose={() => {
            form.resetFields()
            setFileList([])
            setShowInnerTask(false)
          }}
          open={showInnerTask}
          keyboard={false}
          maskClosable={false}
          headerStyle={{ flexDirection: 'row-reverse' }}
          footer={
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button
                onClick={() => {
                  form.resetFields()
                  setFileList([])
                  setShowInnerTask(false)
                }}
                type='default'
              >
                Back
              </Button>
            </Space>
          }
        >
          <div className='detail-content'>
            <div style={{ color: '#1F1F1F', fontWeight: '500', padding: '8px 0' }}>Content</div>
            <div className='detail-content-body'>{detailTask?.content}</div>
          </div>
          <Form form={form}>
            <Form.Item name='response'>
              <div className='info-container' style={{ marginTop: 12 }}>
                <div style={{ color: '#1F1F1F', fontWeight: '500' }}>Enter response</div>
                <Input.TextArea showCount maxLength={250} />
              </div>
            </Form.Item>
            <Form.Item name='document' valuePropName='fileList'>
              <div className='info-container' style={{ marginTop: 12 }}>
                <div style={{ color: '#1F1F1F', fontWeight: '500' }}>Upload document (if need)</div>
                <Upload.Dragger
                  name='files'
                  maxCount={2}
                  showUploadList={{
                    showDownloadIcon: true,
                    downloadIcon: 'Download',
                    showRemoveIcon: true
                  }}
                  fileList={fileList}
                  listType='text'
                  beforeUpload={async (file) => {
                    // const formData = new FormData()
                    // formData.append('file', file)
                    try {
                      const response = await documentAPI.upload({ folderPath: 'create/project', file: file })
                      if (response && response.data) {
                        console.log(response.data)
                      }
                    } catch (error: Dennis) {
                      console.error(error)
                    }
                    return false
                  }}
                  onRemove={(file) => {
                    const index = fileList.indexOf(file)
                    const newFileList = fileList.slice()
                    newFileList.splice(index, 1)
                    setFileList(newFileList)
                  }}
                  onChange={({ fileList }) => {
                    setFileList(fileList)
                  }}
                >
                  <p className='ant-upload-text'>Click or drag file to this area to upload</p>
                  <p className='ant-upload-hint'>Support for a single or bulk upload.</p>
                </Upload.Dragger>
              </div>
            </Form.Item>
          </Form>
        </Drawer>
      </Drawer>
    </div>
  )
}

export default ProjectChildren
