import { Drawer, Space, Button, Modal, Form, Input } from 'antd'
import { FormInstance, useForm } from 'antd/es/form/Form'
import { DetailStudent } from '~/api/student.api'
import { DetailTeacher } from '~/api/teacher.api'
import { ProfileUser } from '~/api/user.api'
import UserAvatar from '~/components/UserAvatar/UserAvatar'
import './style.scss'
import { useState } from 'react'
import { useHandlingApi } from '~/common/context/useHandlingApi'
import fetchHandler from '~/api/axios'

export interface IDetailPanelProps {
  open: boolean
  onClose: VoidFunction
  data?: DetailStudent | DetailTeacher | ProfileUser
  type?: 'student' | 'teacher'
  isUserProfile?: boolean
}

function DetailPanel({ open, onClose, data, type, isUserProfile }: IDetailPanelProps) {
  const [form] = useForm()
  const { showLoading, closeLoading } = useHandlingApi()
  const [openModal, setOpenModal] = useState<boolean>(false)

  const onChangePassword = () => {
    setOpenModal(true)
  }

  const onSubmit = () => {
    form.submit()
  }

  const handleSubmit = async (form: FormInstance<Dennis>) => {
    showLoading()
    const body = {
      oldPassword: form.getFieldValue('oldPassword'),
      newPassword: form.getFieldValue('newPassword')
    }
    try {
      const response = await fetchHandler.post<Dennis>('user/changepassword', body)
      if (response) {
        localStorage.clear()
      }
    } catch (error: Dennis) {
      console.error(error)
    } finally {
      closeLoading()
    }
  }

  const onReset = () => {
    form.resetFields()
    setOpenModal(false)
  }

  return (
    <Drawer
      title={
        isUserProfile
          ? 'User information'
          : type === 'student'
          ? 'View student information'
          : type === 'teacher'
          ? 'View teacher information'
          : 'View detail'
      }
      className='student-detail-info'
      placement='right'
      width={600}
      onClose={onClose}
      open={open}
      keyboard={false}
      maskClosable={false}
      headerStyle={{ flexDirection: 'row-reverse' }}
      footer={
        <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
          <Button onClick={onClose} type={isUserProfile ? 'default' : 'primary'}>
            Back
          </Button>
          {isUserProfile && (
            <Button type='primary' onClick={onChangePassword}>
              Change password
            </Button>
          )}
        </Space>
      }
    >
      <div style={{ padding: 12 }}>
        <div className='student-avatar'>
          {/* <Avatar size={120} icon={<UserOutlined />} /> */}
          <UserAvatar name={data?.name} size={120} />
          <div style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', gap: 12 }}>
            <span>{data?.name}</span>
            {type === 'student' && <span>Student Code: {(data as DetailStudent)?.studentCode}</span>}
          </div>
        </div>
        <div className='info-container'>
          <div className='detail-info'>
            <div className='detail-left'>Date of birth</div>
            <div className='detail-right'>{data?.dateOfBirth}</div>
          </div>
          <div className='detail-info'>
            <div className='detail-left'>Email</div>
            <div className='detail-right'>{data?.email}</div>
          </div>
          {type === 'student' && (
            <div className='detail-info'>
              <div className='detail-left'>Class</div>
              <div className='detail-right'>{(data as DetailStudent)?.class}</div>
            </div>
          )}
          <div className='detail-info'>
            <div className='detail-left'>Phone Number</div>
            <div className='detail-right'>{data?.phoneNumber}</div>
          </div>
          {isUserProfile && type === 'teacher' && (
            <>
              <div className='detail-info'>
                <div className='detail-left'>Department</div>
                <div className='detail-right'>{(data as DetailTeacher)?.department}</div>
              </div>
              <div className='detail-info'>
                <div className='detail-left'>Major</div>
                <div className='detail-right'>{(data as DetailTeacher)?.major}</div>
              </div>
            </>
          )}
          {isUserProfile && (
            <div className='detail-info'>
              <div className='detail-left'>Laboratory</div>
              <div className='detail-right'>{(data as ProfileUser)?.lab?.name}</div>
            </div>
          )}
        </div>
      </div>
      {isUserProfile && (
        <Modal
          open={openModal}
          title='Change password'
          centered={true}
          width='500px'
          onOk={onSubmit}
          onCancel={onReset}
          maskClosable={false}
          destroyOnClose
        >
          <div style={{ marginTop: 12 }}>
            <Form form={form} name='create-task' scrollToFirstError onFinish={() => handleSubmit(form)}>
              <Form.Item
                name='oldPassword'
                rules={[
                  {
                    required: true
                  }
                ]}
              >
                <div className='input-field task-title'>
                  <div style={{ color: '#1F1F1F', fontWeight: '500' }}>Old password</div>
                  <Input.Password size='large' />
                </div>
              </Form.Item>

              <Form.Item
                name='newPassword'
                rules={[
                  {
                    required: true,
                    message: 'Please enter new password'
                  },
                  {
                    validator(_, value, callback) {
                      console.log(value, callback)
                      if (!value || value.length >= 6) {
                        return Promise.resolve()
                      }
                      return Promise.reject('Password length must be greater than 6.')
                    }
                  }
                ]}
                validateTrigger='onBlur'
              >
                <div className='input-field task-content'>
                  <div style={{ color: '#1F1F1F', fontWeight: '500' }}>New password</div>
                  <Input.Password size='large' />
                </div>
              </Form.Item>
            </Form>
          </div>
        </Modal>
      )}
    </Drawer>
  )
}

export default DetailPanel
