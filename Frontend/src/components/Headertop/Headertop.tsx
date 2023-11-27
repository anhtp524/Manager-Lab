import { UserOutlined } from '@ant-design/icons'
import { Dropdown, MenuProps } from 'antd'
import { useNavigate } from 'react-router-dom'
import './headertop.scss'
import Image from '~/assets/Image'
import fetchHandler from '~/api/axios'
import { useHandlingApi } from '~/common/context/useHandlingApi'
import { useAuth } from '~/common/context/useAuth'
import UserAvatar, { addAlpha, stringToColour } from '../UserAvatar/UserAvatar'
const Headertop = () => {
  const navigate = useNavigate()
  const { profileUserInfo } = useAuth()
  const { showLoading, closeLoading } = useHandlingApi()
  const handleClickgotoInfoPage = () => {
    // navigate('/personalinfo');
  }
  const hanleLogout = async () => {
    showLoading()
    try {
      const response = await fetchHandler.get<boolean>('authentication/logout')
      if (response) {
        localStorage.removeItem('token')
        navigate('/auth/login')
      }
    } catch (error: Dennis) {
      console.error(error)
    } finally {
      closeLoading()
    }
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Đăng xuất',
      onClick: () => hanleLogout()
    }
  ]
  return (
    <div className='headertop'>
      <div className='hdleft'>
        <div className='img'>
          <img src={Image.logoUat} alt='' />
          <p className='img-title'>Laboratory Management System</p>
        </div>
      </div>
      <Dropdown menu={{ items }} placement='bottomRight' arrow trigger={['click']}>
        <div onClick={handleClickgotoInfoPage} className='hdright' style={{ display: 'flex', gap: 12 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center' }}>
            <span>Welcome,</span>
            <div
              style={{
                padding: '2px 8px 2px 4px',
                background: addAlpha(stringToColour(profileUserInfo?.name)),
                borderRadius: 18,
                marginLeft: 8
              }}
            >
              <UserAvatar name={profileUserInfo?.name} />
              <span style={{ fontSize: 14, marginLeft: 4 }}>{profileUserInfo?.name}</span>
            </div>
          </div>
        </div>
      </Dropdown>
    </div>
  )
}

export default Headertop
