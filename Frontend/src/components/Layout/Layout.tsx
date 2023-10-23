import {
  FolderOutlined,
  GiftOutlined,
  HeatMapOutlined,
  HomeOutlined,
  ReadOutlined,
  WechatOutlined
} from '@ant-design/icons'
import { Menu } from 'antd'
import { Outlet, useNavigate } from 'react-router-dom'
import Headertop from '../Headertop/Headertop'
import './layout.scss'

function Layout() {
  const navigate = useNavigate()
  const items = [
    {
      label: 'Home',
      key: '/',
      icon: <HomeOutlined />
    },
    {
      label: 'Labs',
      key: '/labs',
      icon: <HeatMapOutlined />
    },
    {
      label: 'Contests and prizes',
      key: '/contestsprizes',
      icon: <GiftOutlined />
    },
    {
      label: 'Project',
      key: '/project',
      icon: <FolderOutlined />
    },
    {
      label: 'New feed',
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
      <div className='layoutheadertop'>
        <Headertop />
      </div>
      <div className='layoutcontent'>
        <div className='ctleft'>
          <Menu
            style={{
              backgroundColor: '#0E2554',
              height: '100%',
              color: 'white'
              // marginTop: '51px'
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
        </div>
        <div className='content'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
// function Content() {
//   return (
//     <div>
//       <Routes>
//         <Route path='/' element={<Homepage />}></Route>
//         <Route path='/profile/lecture' element={<ProfileLecture />}></Route>
//         <Route path='/profile/student' element={<ProfileStudent />}></Route>
//         <Route path='/labs' element={<Labs />}></Route>
//         <Route path='/labsdetail/:id' element={<LabDetail />}></Route>
//         <Route path='/studentmanagement' element={<ManagementStudent />}></Route>
//         <Route path='/productmanagement' element={<ManagementProduct />}></Route>
//         <Route path='/personalinfo' element={<Personalinfo />}></Route>
//       </Routes>
//     </div>
//   )
// }
export default Layout
