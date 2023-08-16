import {
  FolderOutlined,
  GiftOutlined,
  HeatMapOutlined,
  HomeOutlined,
  ReadOutlined,
  WechatOutlined
} from '@ant-design/icons'
import { Menu } from 'antd'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Homepage from '~/pages/Homepage/Homepage'
import Labs from '~/pages/Labs/Labs'
import ManagementProduct from '~/pages/ManagementProduct/ManagementProduct'
import ManagementStudent from '~/pages/ManagementStudent/ManagementStudent'
import Personalinfo from '~/pages/PersonalInfo/Personalinfo'
import Headertop from '../Headertop/Headertop'
import './layout.scss'

function Layout() {
  const navigate = useNavigate()
  const items = [
    {
      label: 'Trang chủ',
      key: '/',
      icon: <HomeOutlined />
    },
    {
      label: 'Labs',
      key: '/labs',
      icon: <HeatMapOutlined />
    },
    {
      label: 'Cuộc thi và giải thưởng',
      key: '/contestsprizes',
      icon: <GiftOutlined />
    },
    {
      label: 'Project',
      key: '/project',
      icon: <FolderOutlined />
    },
    {
      label: 'Bảng tin',
      key: '/newfeed',
      icon: <ReadOutlined />
    },
    {
      label: 'Chat',
      key: '/chat',
      icon: <WechatOutlined />
    }
  ]
  return (
    <div className='layout'>
      <Headertop />
      <div className='layoutcontent' style={{ display: 'flex' }}>
        <Menu
          style={{
            backgroundColor: '#0E2554',
            height: '94vh',
            color: 'white'
          }}
          onClick={({ key }) => {
            if (key === 'signout') {
              //test
            } else {
              navigate(key)
            }
          }}
          items={items}
        ></Menu>
        <div className='content'>
          <Content />
        </div>
      </div>
    </div>
  )
}
function Content() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Homepage />}></Route>
        <Route path='/labs' element={<Labs />}></Route>
        <Route path='/studentmanagement' element={<ManagementStudent />}></Route>
        <Route path='/productmanagement' element={<ManagementProduct />}></Route>
        <Route path='/personalinfo' element={<Personalinfo />}></Route>
      </Routes>
    </div>
  )
}
export default Layout
