import { UserOutlined } from '@ant-design/icons'
import { Dropdown, MenuProps } from 'antd'
import { useNavigate } from 'react-router-dom'
import './headertop.scss'
import Image from '~/assets/Image'
const Headertop = () => {
  const navigate = useNavigate()
  const handleClickgotoInfoPage = () => {
    // navigate('/personalinfo');
  }
  const hanleLogout = () => {
    localStorage.removeItem('accessToken')
    navigate('/login')
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
      <Dropdown menu={{ items }} placement='bottomRight' arrow>
        <div onClick={handleClickgotoInfoPage} className='hdright'>
          Thông tin <UserOutlined />
        </div>
      </Dropdown>
    </div>
  )
}

export default Headertop
