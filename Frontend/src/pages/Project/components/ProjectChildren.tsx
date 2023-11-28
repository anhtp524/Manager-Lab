import { Button, Collapse, DatePicker, Drawer, Form, Input, InputNumber, Modal, Space, Table, Tabs, Upload } from 'antd'
import TableStudentProject from './TableStudentProject'
import TableTeacherProject from './TableTeacherProject'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useHandlingApi } from '~/common/context/useHandlingApi'
import taskAPI, { Task } from '~/api/task.api'
import { ColumnsType } from 'antd/es/table'
import { convertTaskStatusToValue } from '~/pages/Labs/components/Projects'
import { FormInstance, useForm } from 'antd/es/form/Form'
import type { CollapseProps, TabsProps, UploadFile } from 'antd'
import documentAPI, { UploadDocumentResponse } from '~/api/document.api'
import { useAuth } from '~/common/context/useAuth'
import { ProjectStatus, Role } from '~/routes/util'
import { useProjectChildrenContext } from './ProjectChildrenContext'
import projectAPI from '~/api/project.api'
import ViewDetailTask from './task/ViewDetailTask'

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
  const [showCloseProjectDialog, setShowCloseProjectDialog] = useState<boolean>(false)
  const [showFeedbackTask, setShowFeedbackTask] = useState<boolean>(false)
  const [detailTask, setDetailTask] = useState<Task | undefined>(undefined)
  const [detailTaskDoc, setDetailTaskDoc] = useState<UploadDocumentResponse[]>([])
  const [responseTaskDoc, setResponseTaskDoc] = useState<UploadDocumentResponse[]>([])

  const [createTaskFileList, setCreateTaskFileList] = useState<UploadFile[]>([])
  const [createTaskFileIds, setCreateTaskFileIds] = useState<GUID[]>([])
  const [score, setScore] = useState<number>(0)

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
        setCreateTaskFileIds([])
        setCreateTaskFileList([])
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

  const handleResponse = async (form: FormInstance<Dennis>, responseFileDic: { id: GUID; documentName: string }[]) => {
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
  const handleFeedback = async (form: FormInstance<Dennis>, isPass: boolean) => {
    if (!id) return
    showLoading()
    const requestBody = {
      taskId: detailTask?.id as GUID,
      feedback: form.getFieldValue('feedback'),
      isPass: isPass
    }
    console.log('Response task: ', requestBody)
    try {
      const response = await taskAPI.closeTask(requestBody)
      if (response && response.data) {
        form.resetFields()
        getDetailProjectAndTasks(id)
        setShowDetailTask(false)
        setShowFeedbackTask(false)
      }
    } catch (error: Dennis) {
      console.error(error)
    } finally {
      closeLoading()
    }
  }
  const handleCloseProject = async (form: FormInstance<Dennis>) => {
    if (!id) return
    showLoading()
    const requestBody = {
      projectId: id,
      feedback: form.getFieldValue('project-feedback'),
      score: form.getFieldValue('score')
    }
    try {
      const response = await projectAPI.close(requestBody)
      if (response && response.data) {
        form.resetFields()
        setShowCloseProjectDialog(false)
        getDetailProjectAndTasks(id)
      }
    } catch (error: Dennis) {
      console.error(error)
    } finally {
      closeLoading()
    }
  }

  const handleDownloadFile = async (fileId: GUID) => {
    showLoading()
    try {
      const response = await documentAPI.download(fileId)
      if (response) {
        window.open(response.config.baseURL + response.config.url)
      }
    } catch (error: Dennis) {
      console.error
    } finally {
      closeLoading()
    }
  }

  const toggleFeedbackTask = (show: boolean) => {
    setShowFeedbackTask(show)
  }
  const toggleInnerTask = (show: boolean) => {
    setShowInnerTask(show)
  }

  return (
    <div className='project-children'>
      <div className='project-children-content-top'>
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%', gap: 12 }}>
          <div className='title project-info-card'>
            <div>{detailProject?.name}</div>
            <div>{detailProject?.description}</div>
          </div>
          {detailProject?.status === ProjectStatus.Finish && (
            <>
              <div className='project-info-card'>
                <div>Score</div>
                <div style={{ fontSize: 40 }}>{detailProject?.score}</div>
              </div>
              <div className='project-info-card' style={{ minWidth: 300 }}>
                <div>Feedback</div>
                <div>{detailProject?.feedback}</div>
              </div>
            </>
          )}
        </div>
        {authInfo?.roles !== Role.Student && detailProject?.status !== ProjectStatus.Finish && (
          <Button type='primary' danger onClick={() => setShowCloseProjectDialog(true)}>
            Close project
          </Button>
        )}
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
      <ViewDetailTask
        detailTask={detailTask}
        showDetailTask={showDetailTask}
        showInnerTask={showInnerTask}
        showFeedbackTask={showFeedbackTask}
        detailTaskDoc={detailTaskDoc}
        onHideDetailTask={() => setShowDetailTask(false)}
        onToggleFeedbackTask={toggleFeedbackTask}
        onToggleInnerTask={toggleInnerTask}
        onDownloadFile={handleDownloadFile}
        responseTaskDoc={responseTaskDoc}
        onFeedback={handleFeedback}
        onResponse={handleResponse}
      />
      {showCloseProjectDialog && (
        <Modal
          open={showCloseProjectDialog}
          title='Evaluate and close project'
          centered={true}
          width='500px'
          okText='Evaluate'
          onOk={() => handleCloseProject(form)}
          onCancel={() => {
            form.resetFields()
            setShowCloseProjectDialog(false)
          }}
          maskClosable={false}
          destroyOnClose
        >
          <Form form={form} name='evaluate-project' scrollToFirstError onFinish={() => handleSubmit(form)}>
            <Form.Item
              name='project-feedback'
              rules={[
                {
                  required: true
                }
              ]}
            >
              <div className='input-field project-feedback'>
                <div style={{ color: '#1F1F1F', fontWeight: '500' }}>Project feedback</div>
                <Input.TextArea showCount maxLength={100} size='large' />
              </div>
            </Form.Item>

            <Form.Item
              name='score'
              rules={[
                {
                  required: true
                }
              ]}
            >
              <div className='input-field project-score' style={{ width: 100 }}>
                <div style={{ color: '#1F1F1F', fontWeight: '500' }}>Score</div>
                <InputNumber
                  size='large'
                  min={0}
                  max={10}
                  controls={false}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault()
                    }
                  }}
                  value={score}
                  onChange={(value) => setScore(value as number)}
                />
              </div>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  )
}

export default ProjectChildren
