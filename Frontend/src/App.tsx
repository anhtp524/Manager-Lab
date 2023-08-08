import {
  HomeOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Headertop from './components/Headertop/Headertop';
import Homepage from './pages/Homepage/Homepage';
import Login from './pages/Login/Login';

function App() {
  const navigate = useNavigate();
  const items = [
    {
      label: 'Trang chủ',
      key: '/',
      icon: <HomeOutlined />,
    },
    {
      label: 'Sinh viên',
      key: '/dashboard',
      icon: <UnorderedListOutlined />,
    },
    {
      label: 'Quản lí sinh viên',
      key: '/studentmanagement',
      icon: <UnorderedListOutlined />,
    },
    {
      label: 'Quản lí sản phẩm',
      key: '/productmanagement',
      icon: <UserOutlined />,
    },
    {
      label: 'Bảng tin',
      key: '/newfeed',
      icon: <UserOutlined />,
    },
  ];
  return (
    <div id="app">
      <Headertop />
      <div className="appcontent">
        <Menu
          style={{ backgroundColor: '#ccc', height: '700px' }}
          onClick={({ key }) => {
            if (key === 'signout') {
              //test
            } else {
              navigate(key);
            }
          }}
          items={items}
        ></Menu>
        <Content />
      </div>
    </div>
  );
}
function Content() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
