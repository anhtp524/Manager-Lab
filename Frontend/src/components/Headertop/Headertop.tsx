import { Dropdown, MenuProps } from 'antd'
import { useNavigate } from 'react-router-dom'
import './headertop.scss'
import Image from '~/assets/Image'
import fetchHandler from '~/api/axios'
import { useHandlingApi } from '~/common/context/useHandlingApi'
import { useAuth } from '~/common/context/useAuth'
import UserAvatar, { addAlpha, stringToColour } from '../UserAvatar/UserAvatar'
import { useState } from 'react'
import DetailPanel from '~/pages/Labs/components/common/DetailPanel'
import { ProfileUser } from '~/api/user.api'
const Headertop = () => {
  const navigate = useNavigate()
  const { profileUserInfo } = useAuth()
  const { showLoading, closeLoading } = useHandlingApi()
  const [open, setOpen] = useState<boolean>(false)
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

  const onClose = () => {
    setOpen(false)
  }

  const handleOpenProfileUser = () => {
    setOpen(true)
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'User profile',
      onClick: () => handleOpenProfileUser()
    },
    {
      key: '2',
      label: 'Sign out',
      onClick: () => hanleLogout()
    }
  ]
  return (
    <div className='headertop' style={{ marginBottom: '5px' }}>
      <div className='hdleft'>
        <div className='img'>
          <img src={Image.logoUat} alt='' />
          <div className='img-title'>Laboratory Management System</div>
        </div>
      </div>
      <Dropdown menu={{ items }} placement='bottomRight' arrow trigger={['click']}>
        <div onClick={handleClickgotoInfoPage} className='hdright' style={{ display: 'flex', gap: 12 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center' }}>
            <span>Welcome,</span>
            <div
              style={{
                padding: '4px 8px 4px 4px',
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
      {open && <DetailPanel open={open} onClose={onClose} isUserProfile data={profileUserInfo as ProfileUser} />}
    </div>
  )
}

export default Headertop
