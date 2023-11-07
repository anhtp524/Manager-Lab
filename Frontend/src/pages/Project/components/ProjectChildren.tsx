import { Button, Collapse, DatePicker, Divider, Drawer, Form, Input, Space, Table, Tabs, Upload } from 'antd'
import TableStudentProject from './TableStudentProject'
import TableTeacherProject from './TableTeacherProject'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useHandlingApi } from '~/common/context/useHandlingApi'
import taskAPI, { Task, TaskStatus } from '~/api/task.api'
import { ColumnsType } from 'antd/es/table'
import { convertTaskStatusToValue } from '~/pages/Labs/components/Projects'
import { FormInstance, useForm } from 'antd/es/form/Form'
import type { CollapseProps, TabsProps, UploadFile } from 'antd'
import documentAPI, { UploadDocumentResponse } from '~/api/document.api'
import { useAuth } from '~/common/context/useAuth'
import { ProjectStatus, Role } from '~/routes/util'
import { useProjectChildrenContext } from './ProjectChildrenContext'

function ProjectChildren() {
  const { id } = useParams()
  const [form] = useForm()
  const { authInfo } = useAuth()
  const { showLoading, closeLoading } = useHandlingApi()
  const { detailProject, taskList, getDetailProjectAndTasks, abortController } = useProjectChildrenContext()
  // const [detailProject, setDetailProject] = useState<DetailProject | undefined>(undefined)
  // const [taskList, setTaskList] = useState<ListTask>([])
  const [showCreate, setShowCreate] = useState<boolean>(false)
  const [showDetailTask, setShowDetailTask] = useState<boolean>(false)
  const [showInnerTask, setShowInnerTask] = useState<boolean>(false)
  const [detailTask, setDetailTask] = useState<Task | undefined>(undefined)
  const [detailTaskDoc, setDetailTaskDoc] = useState<UploadDocumentResponse[]>([])
  const [responseTaskDoc, setResponseTaskDoc] = useState<UploadDocumentResponse[]>([])
  const [outerPanelWidth, setOuterPanelWidth] = useState<number>(600)
  const [responseFileList, setResponseFileList] = useState<UploadFile[]>([])
  const [responseFileDic, setResponseFileDic] = useState<{ id: GUID; documentName: string }[]>([])
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
    [detailProject]
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
    if (!id) return

    getDetailProjectAndTasks(id)

    return () => {
      abortController?.abort()
    }
  }, [])

  const handleSubmit = async (form: FormInstance<Dennis>) => {
    if (!id) return
    showLoading()
    const requestBody = {
      ...form.getFieldsValue(),
      projectId: id,
      listFileId: createTaskFileIds
    }
    try {
      const response = await taskAPI.createTask(requestBody)
      if (response && response.data) {
        form.resetFields()
        getDetailProjectAndTasks(id)
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
      const response = await Promise.all([
        taskAPI.getById(id),
        documentAPI.byRegarding({ regarding: id, folderPath: 'create/task' }),
        documentAPI.byRegarding({ regarding: id, folderPath: 'response/task' })
      ])
      if (response && response.length > 0) {
        setShowDetailTask(true)
        setDetailTask(response[0].data)
        setDetailTaskDoc(response[1].data)
        setResponseTaskDoc(response[2].data)
      }
    } catch (error: Dennis) {
      console.error(error)
    } finally {
      closeLoading()
    }
  }

  const handleResponse = async (form: FormInstance<Dennis>) => {
    if (!id) return
    showLoading()
    const requestBody = {
      taskId: detailTask?.id as GUID,
      response: form.getFieldValue('response'),
      listAttachment: responseFileDic.map((x) => x.id)
    }
    console.log('Response task: ', requestBody)
    try {
      const response = await taskAPI.responseTask(requestBody)
      if (response && response.data) {
        form.resetFields()
        getDetailProjectAndTasks(id)
        setShowDetailTask(false)
        setShowInnerTask(false)
      }
    } catch (error: Dennis) {
      console.error(error)
    } finally {
      closeLoading()
    }
  }

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
          {authInfo?.roles !== Role.Student &&
            (detailProject?.status === ProjectStatus.New || detailProject?.status === ProjectStatus.OnGoing) && (
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
          <Divider />

          <div className='detail-content'>
            <div className='detail-content-title'>Content</div>
            <div className='detail-content-body'>{detailTask?.content}</div>
          </div>
          {detailTaskDoc &&
            detailTaskDoc.length > 0 &&
            detailTaskDoc.map((item) => (
              <div className='detail-content' key={item.id}>
                <div className='detail-content-title'>Task attachments</div>
                <div className='detail-content-body'>{item?.documentName}</div>
              </div>
            ))}

          <Divider />
          {detailTask?.response && (
            <div className='detail-content'>
              <div className='detail-content-title'>Student response</div>
              <div className='detail-content-body' style={{ wordWrap: 'break-word', fontSize: 14 }}>
                {detailTask?.response}
              </div>
            </div>
          )}
          {responseTaskDoc &&
            responseTaskDoc.length > 0 &&
            responseTaskDoc.map((item) => (
              <div className='detail-content' key={item.id}>
                <div className='detail-content-title'>Response attachments</div>
                <div className='detail-content-body'>{item?.documentName}</div>
              </div>
            ))}
        </div>
        <Drawer
          title='View detail content and response'
          className='view-detail-content-response'
          placement='right'
          width={800}
          onClose={() => {
            form.resetFields()
            setResponseFileDic([])
            setResponseFileList([])
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
                  setResponseFileList([])
                  setResponseFileDic([])
                  setShowInnerTask(false)
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
                Submit response
              </Button>
            </Space>
          }
        >
          <div className='detail-content'>
            <div style={{ color: '#1F1F1F', fontWeight: '500', padding: '8px 0' }}>Content</div>
            <div className='detail-content-body'>{detailTask?.content}</div>
          </div>
          <Form form={form} name='response-task' scrollToFirstError onFinish={() => handleResponse(form)}>
            <Form.Item
              name='response'
              rules={[
                {
                  required: true
                }
              ]}
            >
              <div className='input-field info-container' style={{ marginTop: 12 }}>
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
                    // downloadIcon: 'Download',
                    showRemoveIcon: true
                  }}
                  fileList={responseFileList}
                  listType='text'
                  beforeUpload={async (file) => {
                    // const formData = new FormData()
                    // formData.append('file', file)
                    try {
                      const response = await documentAPI.upload({ folderPath: 'response/task', file: file })
                      if (response && response.data) {
                        setResponseFileDic((item) => [
                          ...item,
                          {
                            id: response.data.id,
                            documentName: response.data.documentName
                          }
                        ])
                      }
                    } catch (error: Dennis) {
                      console.error(error)
                    }
                    return false
                  }}
                  onRemove={(file) => {
                    console.log(file)
                    const index = responseFileList.indexOf(file)
                    const newFileList = responseFileList.slice()
                    newFileList.splice(index, 1)
                    let newResponseFileDic = [...responseFileDic]
                    newResponseFileDic = newResponseFileDic.filter((x) => x.documentName !== file.name)
                    setResponseFileList(newFileList)
                    setResponseFileDic(newResponseFileDic)
                  }}
                  onChange={({ fileList }) => {
                    setResponseFileList(fileList)
                  }}
                >
                  <p className='ant-upload-text'>Click or drag file to this area to upload</p>
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
