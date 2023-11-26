import { FolderOutlined, HeatMapOutlined, HomeOutlined, WechatOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import { Outlet, useNavigate } from 'react-router-dom'
import Headertop from '../Headertop/Headertop'
import './layout.scss'
import { useEffect } from 'react'
import fetchHandler from '~/api/axios'
import { Role } from '~/routes/util'
import { useAuth } from '~/common/context/useAuth'
import { useHandlingApi } from '~/common/context/useHandlingApi'
import userAPI from '~/api/user.api'

function Layout() {
  let items = [
    {
      label: <span>Home</span>,
      key: '/',
      icon: <HomeOutlined />
    },
    {
      label: <span>Laboratories</span>,
      key: '/labs',
      icon: <HeatMapOutlined />
    },
    {
      label: <span>Project</span>,
      key: '/project',
      icon: <FolderOutlined />
    },
    {
      label: <span>Chat</span>,
      key: '/chat',
      icon: <WechatOutlined />
    },
    {
      label: <span>Account management</span>,
      key: '/account',
      icon: <WechatOutlined />
    }
  ]
  const { authInfo, setAuthInfo, setProfileUserInfo, profileUserInfo } = useAuth()
  const { showLoading, closeLoading } = useHandlingApi()
  const navigate = useNavigate()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    const handleCheckAuthentication = async () => {
      showLoading()
      try {
        const response = await Promise.all([
          fetchHandler.get<{ isAuthenticated: boolean; role: Role }>('authentication/checkauthentication', {
            signal: signal
          }),
          userAPI.getProfileUser({ signal: signal })
        ])
        if (response && response.length > 0) {
          const authData = response[0].data
          const profileData = response[1].data

          setAuthInfo({
            roles: authData.role,
            isAuthenticated: authData.isAuthenticated
          })

          setProfileUserInfo(profileData)
        }
      } catch (error) {
        console.error(error)
      } finally {
        closeLoading()
      }
    }

    handleCheckAuthentication()
    return () => {
      abortController.abort()
    }
  }, [])

  if (!authInfo?.isAuthenticated) return null
  if (authInfo.roles === Role.Teacher && profileUserInfo?.lab === null) {
    items = items.filter((x) => x.key !== '/project')
  }
  if (authInfo.roles === Role.Student && (profileUserInfo?.lab === null || !profileUserInfo?.isApproveToLab)) {
    items = items.filter((x) => x.key !== '/project')
  }
  if (authInfo.roles !== Role.Admin) {
    items = items.filter((x) => x.key !== '/account')
  }

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
