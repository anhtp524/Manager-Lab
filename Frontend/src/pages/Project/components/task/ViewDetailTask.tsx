import { Button, Drawer, Form, Input, Space, Upload, UploadFile } from 'antd'
import { FormInstance, useForm } from 'antd/es/form/Form'
import { useAuth } from '~/common/context/useAuth'
import { Task, TaskStatus } from '~/api/task.api'
import { Role } from '~/routes/util'
import documentAPI, { UploadDocumentResponse } from '~/api/document.api'
import { DownloadOutlined } from '@ant-design/icons'
import { convertTaskStatusToValue } from '~/pages/Labs/components/Projects'
import { useState } from 'react'

export interface IViewDetailTaskProps {
  showDetailTask: boolean
  showInnerTask: boolean
  showFeedbackTask: boolean
  detailTask?: Task
  detailTaskDoc?: UploadDocumentResponse[]
  responseTaskDoc?: UploadDocumentResponse[]
  onHideDetailTask: VoidFunction
  onToggleFeedbackTask: (show: boolean) => void
  onToggleInnerTask: (show: boolean) => void
  onDownloadFile: (fileId: GUID) => Promise<void>
  onFeedback: (form: FormInstance<Dennis>, isPass: boolean) => Promise<void>
  onResponse: (form: FormInstance<Dennis>, responseFileDic: { id: GUID; documentName: string }[]) => Promise<void>
}

function ViewDetailTask(props: IViewDetailTaskProps) {
  const {
    detailTask,
    showDetailTask,
    showInnerTask,
    showFeedbackTask,
    detailTaskDoc,
    onHideDetailTask,
    onDownloadFile,
    onFeedback,
    responseTaskDoc,
    onResponse,
    onToggleFeedbackTask,
    onToggleInnerTask
  } = props
  const [form] = useForm()
  const { authInfo } = useAuth()
  const [responseFileList, setResponseFileList] = useState<UploadFile[]>([])
  const [responseFileDic, setResponseFileDic] = useState<{ id: GUID; documentName: string }[]>([])
  const [isPass, setIsPass] = useState<boolean>(false)
  return (
    <Drawer
      title='View detail task'
      className='view-detail-task'
      placement='right'
      width={600}
      onClose={onHideDetailTask}
      open={showDetailTask}
      keyboard={false}
      maskClosable={false}
      headerStyle={{ flexDirection: 'row-reverse' }}
      footer={
        <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
          <Button onClick={onHideDetailTask} type='default'>
            Back
          </Button>
          {authInfo?.roles === Role.Student && detailTask?.status !== TaskStatus.Pass && (
            <Button type='primary' onClick={() => onToggleInnerTask(true)}>
              View content and response
            </Button>
          )}
          {authInfo?.roles !== Role.Student && detailTask?.status === TaskStatus.Resolve && (
            <Button type='primary' onClick={() => onToggleFeedbackTask(true)}>
              Mark
            </Button>
          )}
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
        {detailTaskDoc &&
          detailTaskDoc.length > 0 &&
          detailTaskDoc.map((item) => (
            <div className='detail-content' key={item.id}>
              <div className='detail-content-title'>Task attachments</div>
              <div className='detail-content-body has-file'>
                <div className='filename'>{item?.documentName}</div>
                <Button icon={<DownloadOutlined />} onClick={() => onDownloadFile(item.id)}></Button>
              </div>
            </div>
          ))}

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
              <div className='detail-content-body has-file'>
                {item?.documentName}
                <Button icon={<DownloadOutlined />} onClick={() => onDownloadFile(item.id)}></Button>
              </div>
            </div>
          ))}
        {detailTask?.feedback && (
          <div className='detail-content'>
            <div className='detail-content-title'>Feedback</div>
            <div className='detail-content-body'>{detailTask?.feedback}</div>
          </div>
        )}
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
          onToggleInnerTask(false)
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
                onToggleInnerTask(false)
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
        <Form form={form} name='response-task' scrollToFirstError onFinish={() => onResponse(form, responseFileDic)}>
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

      <Drawer
        title='View response and feedback'
        className='view-response-feedback'
        placement='right'
        width={800}
        onClose={() => {
          form.resetFields()
          onToggleFeedbackTask(false)
        }}
        open={showFeedbackTask}
        keyboard={false}
        maskClosable={false}
        headerStyle={{ flexDirection: 'row-reverse' }}
        footer={
          <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
            <Button
              onClick={() => {
                form.resetFields()
                onToggleFeedbackTask(false)
              }}
              type='default'
            >
              Back
            </Button>
            <Button
              onClick={() => {
                setIsPass(false)
                form.submit()
              }}
              danger
            >
              Reopen
            </Button>
            <Button
              onClick={() => {
                setIsPass(true)
                form.submit()
              }}
              type='primary'
            >
              Mark as passed
            </Button>
          </Space>
        }
      >
        <Form form={form} name='feedback-task' scrollToFirstError onFinish={() => onFeedback(form, isPass)}>
          <Form.Item
            name='feedback'
            rules={[
              {
                required: true
              }
            ]}
          >
            <div className='input-field info-container' style={{ marginTop: 12 }}>
              <div style={{ color: '#1F1F1F', fontWeight: '500' }}>Enter feedback</div>
              <Input.TextArea showCount maxLength={250} />
            </div>
          </Form.Item>
        </Form>
      </Drawer>
    </Drawer>
  )
}

export default ViewDetailTask
