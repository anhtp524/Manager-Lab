import { UserOutlined } from '@ant-design/icons'
import { Dropdown, MenuProps } from 'antd'
import { useNavigate } from 'react-router-dom'
import './headertop.scss'
import Image from '~/assets/Image'
import fetchHandler from '~/api/axios'
import { useHandlingApi } from '~/common/context/useHandlingApi'
import { useAuth } from '~/common/context/useAuth'
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
          <p className='img-title'>Quản lí sinh viên trong phòng thí nghiệm</p>
        </div>
      </div>
      <Dropdown menu={{ items }} placement='bottomRight' arrow trigger={['click']}>
        <div onClick={handleClickgotoInfoPage} className='hdright' style={{ display: 'flex', gap: 12 }}>
          <div>
            Xin chào <strong>{profileUserInfo?.name}</strong>
          </div>
          <div>
            Thông tin <UserOutlined />
          </div>
        </div>
      </Dropdown>
    </div>
  )
}

export default Headertop
