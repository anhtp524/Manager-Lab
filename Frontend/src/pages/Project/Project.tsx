import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Drawer, Form, FormInstance, Input, Space, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { convertStatusEnumToValue } from '../Labs/components/Projects'
import './Project.scss'
import { useAuth } from '~/common/context/useAuth'
import { useHandlingApi } from '~/common/context/useHandlingApi'
import projectAPI, { Project, ProjectList } from '~/api/project.api'

// interface DataNodeType {
//   value: string
//   label: string
//   children?: DataNodeType[]
// }

function Project() {
  const navigate = useNavigate()
  const { profileUserInfo } = useAuth()
  const { showLoading, closeLoading } = useHandlingApi()

  const [labProjects, setLabProjects] = useState<ProjectList>([])
  const [showCreate, setShowCreate] = useState<boolean>(false)

  const [form] = Form.useForm()

  const columnProjectList: ColumnsType<Project> = useMemo(
    () => [
      {
        title: 'Name',
        dataIndex: 'name',
        render: (text, record) => {
          return (
            <a
              onClick={() => {
                navigate('/project/details/' + record?.id)
              }}
              className='column-name-project'
            >
              {text}
            </a>
          )
        }
      },
      {
        title: 'Description',
        dataIndex: 'description'
      },
      {
        title: 'Core technology',
        dataIndex: 'coreTech'
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
        {profileUserInfo?.lab && profileUserInfo?.isApproveToLab && (
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
        )}
        <div className='table-project'>
          <Table columns={columnProjectList} dataSource={labProjects} bordered />
        </div>
      </div>
    )
  }, [labProjects])

  const onCreateProject = () => {
    setShowCreate(true)
  }

  const handleSubmit = async (form: FormInstance<Dennis>) => {
    showLoading()
    const requestBody = {
      projectAdd: {
        ...form.getFieldsValue()
      },
      listStudent: [],
      listTeacher: [],
      listAttachment: []
    }
    console.log(requestBody)
    try {
      const response = await projectAPI.createProject(requestBody)
      if (response && response.data) {
        form.resetFields()
        setShowCreate(false)
      }
    } catch (error: Dennis) {
      console.error(error)
    } finally {
      closeLoading()
    }
  }

  return (
    <>
      {onRenderContent()}
      <Drawer
        title='Create a project'
        className='create-project-panel'
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
        <Form form={form} name='create-project' scrollToFirstError onFinish={() => handleSubmit(form)}>
          <Form.Item
            name='name'
            rules={[
              {
                required: true
              }
            ]}
          >
            <div className='input-field project-name'>
              <div style={{ color: '#1F1F1F', fontWeight: '500' }}>Project name</div>
              <Input />
            </div>
          </Form.Item>

          <Form.Item
            name='description'
            rules={[
              {
                required: true
              }
            ]}
          >
            <div className='input-field project-description'>
              <div style={{ color: '#1F1F1F', fontWeight: '500' }}>Description</div>
              <Input.TextArea showCount maxLength={100} />
            </div>
          </Form.Item>

          <Form.Item
            name='coreTech'
            rules={[
              {
                required: true
              }
            ]}
          >
            <div className='input-field project-coreTech'>
              <div style={{ color: '#1F1F1F', fontWeight: '500' }}>Core technology</div>
              <Input />
            </div>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  )
}

export default Project
