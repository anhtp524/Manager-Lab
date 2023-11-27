import { UserOutlined } from '@ant-design/icons'
import { Drawer, Space, Button, Avatar } from 'antd'
import { DetailStudent } from '~/api/student.api'
import { DetailTeacher } from '~/api/teacher.api'
import UserAvatar from '~/components/UserAvatar/UserAvatar'

export interface IDetailPanelProps {
  open: boolean
  onClose: VoidFunction
  data?: DetailStudent | DetailTeacher
  type: 'student' | 'teacher'
  isUserProfile: boolean
}

function DetailPanel({ open, onClose, data, type, isUserProfile }: IDetailPanelProps) {
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
          <Button onClick={onClose} type='primary'>
            Back
          </Button>
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
          {(isUserProfile || type === 'teacher') && (
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
        </div>
      </div>
    </Drawer>
  )
}

export default DetailPanel
