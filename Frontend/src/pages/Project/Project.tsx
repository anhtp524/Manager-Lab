import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Drawer, Form, FormInstance, Input, List, Space, Table, Tag, Upload, UploadFile } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { convertStatusEnumToValue } from '../Labs/components/Projects'
import './Project.scss'
import { useAuth } from '~/common/context/useAuth'
import { useHandlingApi } from '~/common/context/useHandlingApi'
import projectAPI, { Project } from '~/api/project.api'
import documentAPI from '~/api/document.api'
import Search from 'antd/es/input/Search'
import studentAPI from '~/api/student.api'
import { debounce } from 'lodash'
import teacherAPI from '~/api/teacher.api'
import { ProjectStatus, Role } from '~/routes/util'
import { toast } from 'react-toastify'
import { useGetAllProject } from './project.context'
import UserAvatar from '~/components/UserAvatar/UserAvatar'

function Project() {
  const navigate = useNavigate()
  const { profileUserInfo, authInfo } = useAuth()
  const { showLoading, closeLoading } = useHandlingApi()
  const { labProjects, getAllProjects, abortController } = useGetAllProject()

  // const [labProjects, setLabProjects] = useState<ProjectList>([])
  const [showCreate, setShowCreate] = useState<boolean>(false)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [searchStudentLoading, setSearchStudentLoading] = useState<boolean>(false)
  const [studentList, setStudentList] = useState<{ id: GUID; name: string }[]>([])
  const [showListStudent, setShowListStudent] = useState<boolean>(false)
  const [selectedStudent, setSelectedStudent] = useState<{ name: string; id: GUID; index: number }[]>([])
  const [members, setMembers] = useState<{ name: string; id: GUID; index: number }[]>([])
  const [searchTeacherLoading, setSearchTeacherLoading] = useState<boolean>(false)
  const [teacherList, setTeacherList] = useState<{ id: GUID; name: string }[]>([])
  const [showListTeacher, setShowListTeacher] = useState<boolean>(false)
  const [selectedTeacher, setSelectedTeacher] = useState<{ name: string; id: GUID; index: number }[]>([])
  const [teachers, setTeachers] = useState<{ name: string; id: GUID; index: number }[]>([])
  const [responseFileDic, setResponseFileDic] = useState<{ id: GUID; documentName: string }[]>([])
  // const [certInfo, setCertInfo] = useState<{
  //   studentName?: string
  //   labName?: string
  //   score?: number
  //   finishDate?: string
  // }>()

  const ref = useRef<string>()

  const [form] = Form.useForm()

  const columnProjectList: ColumnsType<Project> = useMemo(
    () =>
      authInfo?.roles === Role.Student
        ? [
            {
              title: 'Name',
              dataIndex: 'name',
              render: (text, record) => {
                return (
                  <a
                    onClick={() => {
                      showLoading()
                      navigate('/project/details/' + record?.id)
                    }}
                    className='column-name-project'
                  >
                    {text}
                  </a>
                )
              }
            },
            // {
            //   title: 'Description',
            //   dataIndex: 'description'
            // },
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
            },
            {
              render: (_, record) => {
                if (record.status === ProjectStatus.Finish) {
                  return (
                    <Button type='primary' danger onClick={() => window.open(`/certificate/${record.id}`)}>
                      Generate Certificate
                    </Button>
                  )
                }
              }
            }
          ]
        : [
            {
              title: 'Name',
              dataIndex: 'name',
              render: (text, record) => {
                return (
                  <a
                    onClick={() => {
                      showLoading()
                      navigate('/project/details/' + record?.id)
                    }}
                    className='column-name-project'
                  >
                    {text}
                  </a>
                )
              }
            },
            // {
            //   title: 'Description',
            //   dataIndex: 'description'
            // },
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
            },
            {
              render: (_, record) => {
                if (record.status !== ProjectStatus.Finish && record.status !== ProjectStatus.Cancel) {
                  return (
                    <Space>
                      {(record.status === ProjectStatus.New || record.status === ProjectStatus.UnConfirm) && (
                        <Button type='primary' onClick={() => handleStartProject(record.id)}>
                          Start project
                        </Button>
                      )}
                      <Button type='dashed' onClick={() => handleCancelProject({ projectId: record.id })}>
                        Cancel
                      </Button>
                    </Space>
                  )
                }
              }
            }
          ],
    [labProjects, getAllProjects]
  )

  useEffect(() => {
    getAllProjects()
    return () => {
      abortController?.abort()
    }
  }, [])

  const handleStartProject = async (id: GUID) => {
    showLoading()
    try {
      const response = await projectAPI.start(id)
      if (response && response.data) {
        getAllProjects()
        toast.success('Project started', { autoClose: 2000 })
      }
    } catch (error: Dennis) {
      console.error(error)
    } finally {
      closeLoading()
    }
  }
  const handleCancelProject = async (body: { projectId: GUID }) => {
    showLoading()
    try {
      const response = await projectAPI.cancel(body)
      if (response && response.data) {
        getAllProjects()
        toast.success('Project cancelled', { autoClose: 2000 })
      }
    } catch (error: Dennis) {
      console.error(error)
    } finally {
      closeLoading()
    }
  }

  // const handleGetCertificate = async (id: GUID) => {
  //   showLoading()
  //   try {
  //     const response = await projectAPI.getCertificate(id)
  //     if (response && response.data) {
  //       setCertInfo((prev) => {
  //         return {
  //           ...prev,
  //           studentName: response.data.student.studentName,
  //           labName: response.data.labName,
  //           score: response.data.project.score,
  //           finishDate: response.data.project.finishDate
  //         }
  //       })
  //     }
  //   } catch (error: Dennis) {
  //     console.error(error)
  //   } finally {
  //     closeLoading()
  //   }
  // }

  const onRenderContent = useCallback(() => {
    return (
      <div className='project'>
        <div className='title-header-project'>
          <span>Project</span>
        </div>
        {(authInfo?.roles !== Role.Student || (profileUserInfo?.lab && profileUserInfo?.isApproveToLab)) && (
          <Space size='small'>
            <Button type='primary' onClick={onCreateProject}>
              Create project
            </Button>
            {/* <Button type='default' disabled>
              Edit
            </Button>
            <Button type='default' disabled>
              Delete
            </Button> */}
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
    if (authInfo?.roles !== Role.Student && members && members.length === 0) {
      toast.error('Project must have at least 1 student')
      closeLoading()
      return
    }
    if (authInfo?.roles === Role.Student && teachers && teachers.length === 0) {
      toast.error('Project must have at least 1 teacher')
      closeLoading()
      return
    }
    const requestBody = {
      projectAdd: {
        ...form.getFieldsValue(['name', 'description', 'coreTech'])
      },
      listStudent: members.map((x) => x.id).filter((x) => x !== profileUserInfo?.id),
      listTeacher: teachers.map((x) => x.id),
      listAttachment: responseFileDic.map((x) => x.id)
    }
    try {
      const response = await projectAPI.createProject(requestBody)
      if (response && response.data) {
        form.resetFields()
        setShowCreate(false)
        getAllProjects()
        onResetForm()
      }
    } catch (error: Dennis) {
      console.error(error)
    } finally {
      closeLoading()
    }
  }

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>, isStudent: boolean) => {
    const search = e.target.value
    ref.current = search
    if (isStudent) {
      setShowListStudent(true)
      setSearchStudentLoading(!!search)

      debounceLoadPeople(search, true)
    } else {
      setShowListTeacher(true)
      setSearchTeacherLoading(!!search)

      debounceLoadPeople(search, false)
    }
  }

  const handleSearchPeople = async (search: string, isStudent: boolean) => {
    if (!search) {
      isStudent ? setShowListStudent(false) : setShowListTeacher(false)
      isStudent ? setStudentList([]) : setTeacherList([])
      isStudent ? setSelectedStudent([]) : setSelectedTeacher([])
      return
    }
    try {
      if (isStudent) {
        const response = await studentAPI.searchByName({ searchName: search })
        if (response && response.data) {
          setSearchStudentLoading(false)
          if (members && members.length > 0) {
            const arr = response.data.map((x) => {
              return { id: x.id, name: x.name }
            })
            const filteredStudentList = arr.filter((item) => !members.map((x) => x.id).includes(item.id))
            setStudentList(filteredStudentList)
          } else {
            setStudentList(
              response.data.map((x) => {
                return { id: x.id, name: x.name + `(${x.email})` }
              })
            )
          }
        }
      } else {
        const response = await teacherAPI.searchByName({ searchName: search })
        if (response && response.data) {
          setSearchTeacherLoading(false)
          if (teachers && teachers.length > 0) {
            const arr = response.data.map((x) => {
              return { id: x.id, name: x.name }
            })
            const filteredTeacherList = arr.filter((item) => !teachers.map((x) => x.id).includes(item.id))
            setTeacherList(filteredTeacherList)
          } else {
            setTeacherList(
              response.data.map((x) => {
                return { id: x.id, name: x.name + `(${x.email})` }
              })
            )
          }
        }
      }
    } catch (error: Dennis) {
      console.error(error)
    }
  }
  const debounceLoadPeople = debounce(handleSearchPeople, 800)

  const handleSelectPeople = (item: { name: string; id: GUID; index: number }, isStudent: boolean) => {
    if (isStudent) {
      const selectedStudentCopy = [...selectedStudent]
      selectedStudentCopy.push({ name: item.name, id: item.id, index: item.index })
      const studentListCopy = [...studentList]
      const filteredStudentList = studentListCopy.filter((x) => x.id !== item.id)
      setSelectedStudent(selectedStudentCopy)
      setStudentList(filteredStudentList)
    } else {
      const selectedTeacherCopy = [...selectedTeacher]
      selectedTeacherCopy.push({ name: item.name, id: item.id, index: item.index })
      const teacherListCopy = [...teacherList]
      const filteredTeacherList = teacherListCopy.filter((x) => x.id !== item.id)
      setSelectedTeacher(selectedTeacherCopy)
      setTeacherList(filteredTeacherList)
    }
  }

  const onResetForm = () => {
    form.resetFields()
    setFileList([])
    setShowListStudent(false)
    setShowListTeacher(false)
    setSelectedStudent([])
    setSelectedTeacher([])
    setTeacherList([])
    setStudentList([])
    setTeachers([])
    setMembers([])
    setShowCreate(false)
  }

  const handleRemove = (item: { id: GUID; name: string }, isStudent: boolean) => {
    if (isStudent) {
      const studentListCopy = [...studentList]
      let selectedStudentCopy = [...selectedStudent]
      selectedStudentCopy = selectedStudentCopy.filter((x) => x.id !== item.id)
      studentListCopy.push(item)
      setSelectedStudent(selectedStudentCopy)
      setStudentList(studentListCopy)
    } else {
      const teacherListCopy = [...teacherList]
      let selectedTeacherCopy = [...selectedTeacher]
      selectedTeacherCopy = selectedTeacherCopy.filter((x) => x.id !== item.id)
      teacherListCopy.push(item)
      setSelectedTeacher(selectedTeacherCopy)
      setTeacherList(teacherListCopy)
    }
  }

  const handleRemovePeople = (id: GUID, isStudent: boolean) => {
    if (isStudent) {
      let membersCopy = [...members]
      membersCopy = membersCopy.filter((x) => x.id !== id)
      setMembers(membersCopy)
    } else {
      let teachersCopy = [...teachers]
      teachersCopy = teachersCopy.filter((x) => x.id !== id)
      setTeachers(teachersCopy)
    }
  }

  return (
    <>
      {onRenderContent()}
      {showCreate && (
        <Drawer
          title='Create a project'
          className='create-project-panel'
          placement='right'
          width={600}
          onClose={onResetForm}
          open={showCreate}
          keyboard={false}
          maskClosable={false}
          headerStyle={{ flexDirection: 'row-reverse' }}
          destroyOnClose
          footer={
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={onResetForm} type='default'>
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

            <Form.Item name='listStudents'>
              <div className='input-field project-listStudents'>
                <div style={{ color: '#1F1F1F', fontWeight: '500' }}>Members</div>
                <Search loading={searchStudentLoading} onChange={(e) => onSearch(e, true)} allowClear />
                <div className='people-picker' style={showListStudent ? {} : { display: 'none' }}>
                  <div className='tag-container' style={{ padding: 4, display: 'flex', flexWrap: 'wrap' }}>
                    {selectedStudent && selectedStudent.length > 0 ? (
                      selectedStudent.map((item) => (
                        <div key={item.id}>
                          <Tag color='purple' onClose={() => handleRemove(item, true)} closeIcon>
                            {item.name}
                          </Tag>
                        </div>
                      ))
                    ) : (
                      <div />
                    )}
                  </div>
                  <List
                    itemLayout='horizontal'
                    dataSource={studentList.map((x) => {
                      return { id: x.id, name: x.name }
                    })}
                    renderItem={(item, index) => (
                      <List.Item
                        onClick={() => handleSelectPeople({ name: item.name, id: item.id, index: index }, true)}
                      >
                        <List.Item.Meta
                          // avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                          avatar={<UserAvatar name={item.name} />}
                          title={<strong style={{ fontSize: 16 }}>{item.name}</strong>}
                          style={{ alignItems: 'center', padding: '8px' }}
                          className={`people-item`}
                        />
                      </List.Item>
                    )}
                    footer={
                      <Space style={{ justifyContent: 'flex-end', width: '100%', paddingRight: '8px' }}>
                        <Button
                          type='default'
                          onClick={() => {
                            setSelectedStudent([])
                            setShowListStudent(false)
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          type='primary'
                          disabled={selectedStudent.length === 0}
                          onClick={() => {
                            setMembers([...members, ...selectedStudent])
                            setSelectedStudent([])
                            setShowListStudent(false)
                          }}
                        >
                          OK
                        </Button>
                      </Space>
                    }
                  />
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {members && members.length > 0 ? (
                    members.map((item) => (
                      <div key={item.id} style={{ marginTop: 8 }}>
                        <Tag
                          color='purple'
                          style={{ fontSize: 14 }}
                          closeIcon
                          onClose={() => handleRemovePeople(item.id, true)}
                        >
                          {item.name}
                        </Tag>
                      </div>
                    ))
                  ) : (
                    <div />
                  )}
                </div>
              </div>
            </Form.Item>

            <Form.Item name='listTeachers'>
              <div className='input-field project-listTeachers'>
                <div style={{ color: '#1F1F1F', fontWeight: '500' }}>Teachers</div>
                <Search loading={searchTeacherLoading} onChange={(e) => onSearch(e, false)} allowClear />
                <div className='people-picker' style={showListTeacher ? {} : { display: 'none' }}>
                  <div className='tag-container' style={{ padding: 4, display: 'flex', flexWrap: 'wrap' }}>
                    {selectedTeacher && selectedTeacher.length > 0 ? (
                      selectedTeacher.map((item) => (
                        <div key={item.id}>
                          <Tag color='orange' onClose={() => handleRemove(item, false)} closeIcon>
                            {item.name}
                          </Tag>
                        </div>
                      ))
                    ) : (
                      <div />
                    )}
                  </div>
                  <List
                    itemLayout='horizontal'
                    dataSource={teacherList.map((x) => {
                      return { id: x.id, name: x.name }
                    })}
                    renderItem={(item, index) => (
                      <List.Item
                        onClick={() => handleSelectPeople({ name: item.name, id: item.id, index: index }, false)}
                      >
                        <List.Item.Meta
                          // avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                          avatar={<UserAvatar name={item.name} />}
                          title={<strong style={{ fontSize: 16 }}>{item.name}</strong>}
                          style={{ alignItems: 'center', padding: '8px' }}
                          className={`people-item`}
                        />
                      </List.Item>
                    )}
                    footer={
                      <Space style={{ justifyContent: 'flex-end', width: '100%', paddingRight: '8px' }}>
                        <Button
                          type='default'
                          onClick={() => {
                            setSelectedTeacher([])
                            setShowListTeacher(false)
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          type='primary'
                          disabled={selectedTeacher.length === 0}
                          onClick={() => {
                            setTeachers([...teachers, ...selectedTeacher])
                            setSelectedTeacher([])
                            setShowListTeacher(false)
                          }}
                        >
                          OK
                        </Button>
                      </Space>
                    }
                  />
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {teachers && teachers.length > 0 ? (
                    teachers.map((item) => (
                      <div key={item.id} style={{ marginTop: 8 }}>
                        <Tag
                          color='orange'
                          style={{ fontSize: 14 }}
                          closeIcon
                          onClose={() => handleRemovePeople(item.id, false)}
                        >
                          {item.name}
                        </Tag>
                      </div>
                    ))
                  ) : (
                    <div />
                  )}
                </div>
              </div>
            </Form.Item>
            <Form.Item name='document'>
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
                      showLoading()
                      const response = await documentAPI.upload({ folderPath: 'create/project', file: file })
                      if (response && response.data) {
                        // setDocumentId([...documentId, response.data.id])
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
                    } finally {
                      closeLoading()
                    }
                    return false
                  }}
                  onRemove={(file) => {
                    const index = fileList.indexOf(file)
                    const newFileList = fileList.slice()
                    newFileList.splice(index, 1)
                    // setFileList(newFileList)
                    let newResponseFileDic = [...responseFileDic]
                    newResponseFileDic = newResponseFileDic.filter((x) => x.documentName !== file.name)
                    setFileList(newFileList)
                    setResponseFileDic(newResponseFileDic)
                  }}
                  onChange={({ fileList }) => {
                    setFileList(fileList)
                  }}
                >
                  <p className='ant-upload-text' style={{ padding: '12px 0' }}>
                    Click or drag file to this area to upload
                  </p>
                </Upload.Dragger>
              </div>
            </Form.Item>
          </Form>
        </Drawer>
      )}
    </>
  )
}

export default Project
