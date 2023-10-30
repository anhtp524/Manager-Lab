import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AutoComplete,
  Button,
  Cascader,
  CascaderProps,
  Checkbox,
  Col,
  Drawer,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Table
} from 'antd'
import { ColumnsType } from 'antd/es/table'
import { convertStatusEnumToValue } from '../Labs/components/Projects'
import './Project.scss'
import { useAuth } from '~/common/context/useAuth'
import { useHandlingApi } from '~/common/context/useHandlingApi'
import projectAPI, { Project, ProjectList } from '~/api/project.api'

interface DataNodeType {
  value: string
  label: string
  children?: DataNodeType[]
}

function Project() {
  const navigate = useNavigate()
  const { profileUserInfo } = useAuth()
  const { showLoading, closeLoading } = useHandlingApi()

  const [labProjects, setLabProjects] = useState<ProjectList>([])
  const [showCreate, setShowCreate] = useState<boolean>(false)

  const [form] = Form.useForm()

  const prefixSelector = (
    <Form.Item name='prefix' noStyle>
      <Select style={{ width: 70 }}>
        <Select.Option value='86'>+86</Select.Option>
        <Select.Option value='87'>+87</Select.Option>
      </Select>
    </Form.Item>
  )

  const suffixSelector = (
    <Form.Item name='suffix' noStyle>
      <Select style={{ width: 70 }}>
        <Select.Option value='USD'>$</Select.Option>
        <Select.Option value='CNY'>¥</Select.Option>
      </Select>
    </Form.Item>
  )

  const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([])

  const onWebsiteChange = (value: string) => {
    if (!value) {
      setAutoCompleteResult([])
    } else {
      setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`))
    }
  }

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website
  }))
  const columnProjectList: ColumnsType<Project> = useMemo(
    () => [
      {
        title: 'Name',
        dataIndex: 'name',
        render: (text) => {
          return (
            <a
              onClick={() => {
                navigate('/project/details/' + profileUserInfo?.lab?.id)
              }}
              className='column-name-project'
            >
              {text}
            </a>
          )
        }
      },
      {
        title: 'Date',
        dataIndex: 'date'
      },
      {
        title: 'Description',
        dataIndex: 'description'
      },
      {
        title: 'Status',
        dataIndex: 'status',
        render: (status) => {
          return convertStatusEnumToValue(status)
        }
      }
    ],
    [navigate]
  )

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    const handleGetLabProject = async () => {
      const labId = profileUserInfo?.lab?.id
      if (labId === undefined) return
      showLoading()
      try {
        const response = await projectAPI.getProjectInLab(labId, { signal: signal })
        if (response && response.data) {
          setLabProjects(response.data)
        }
      } catch (error: Dennis) {
        console.error(error)
      } finally {
        closeLoading()
      }
    }

    handleGetLabProject()

    return () => {
      abortController.abort()
    }
  }, [])

  const onRenderContent = useCallback(() => {
    return (
      <div className='project'>
        <div className='title-header-project'>
          <span>Project</span>
        </div>
        <Space size='small'>
          <Button type='primary' onClick={onCreateProject}>
            Create project
          </Button>
          <Button type='default' disabled>
            Edit
          </Button>
          <Button type='default' disabled>
            Delete
          </Button>
        </Space>
        <div className='table-project'>
          <Table columns={columnProjectList} dataSource={labProjects} bordered />
        </div>
      </div>
    )
  }, [columnProjectList])

  const onCreateProject = () => {
    setShowCreate(true)
  }

  return (
    <>
      {onRenderContent()}
      <Drawer
        title='Create a project'
        className='create-project-panel'
        placement='right'
        width={600}
        onClose={() => setShowCreate(false)}
        open={showCreate}
        keyboard={false}
        maskClosable={false}
        headerStyle={{ flexDirection: 'row-reverse' }}
        footer={
          <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
            <Button onClick={() => setShowCreate(false)} type='default'>
              Back
            </Button>
            <Button
              onClick={() => {
                form.validateFields().then((values) => console.log(values))
              }}
              type='primary'
            >
              Save and create
            </Button>
          </Space>
        }
      >
        <Form form={form} name='create-project' scrollToFirstError>
          <Form.Item
            name='project-name'
            rules={[
              {
                // required: true,
                min: 6,
                max: 10
              },
              (form) => ({
                validator(_, value) {
                  if (value.length) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('The new password that you entered do not match!'))
                }
              })
            ]}
          >
            <div className='input-field project-name'>
              <div style={{ color: '#1F1F1F', fontWeight: '500' }}>Project name</div>
              <Input />
            </div>
          </Form.Item>

          <Form.Item
            name='password'
            label='Password'
            rules={[
              {
                required: true,
                message: 'Please input your password!'
              }
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name='confirm'
            label='Confirm Password'
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!'
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('The new password that you entered do not match!'))
                }
              })
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name='phone'
            label='Phone Number'
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name='donation'
            label='Donation'
            rules={[{ required: true, message: 'Please input donation amount!' }]}
          >
            <InputNumber addonAfter={suffixSelector} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name='website' label='Website' rules={[{ required: true, message: 'Please input website!' }]}>
            <AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder='website'>
              <Input />
            </AutoComplete>
          </Form.Item>

          <Form.Item name='intro' label='Intro' rules={[{ required: true, message: 'Please input Intro' }]}>
            <Input.TextArea showCount maxLength={100} />
          </Form.Item>

          <Form.Item name='gender' label='Gender' rules={[{ required: true, message: 'Please select gender!' }]}>
            <Select placeholder='select your gender'>
              <Select.Option value='male'>Male</Select.Option>
              <Select.Option value='female'>Female</Select.Option>
              <Select.Option value='other'>Other</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label='Captcha' extra='We must make sure that your are a human.'>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item
                  name='captcha'
                  noStyle
                  rules={[{ required: true, message: 'Please input the captcha you got!' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Button>Get captcha</Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  )
}

export default Project
