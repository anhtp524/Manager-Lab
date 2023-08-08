import {
  FolderOutlined,
  HomeOutlined,
  ReadOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Homepage from '~/pages/Homepage/Homepage';
import ManagementProduct from '~/pages/ManagementProduct/ManagementProduct';
import ManagementStudent from '~/pages/ManagementStudent/ManagementStudent';
import Personalinfo from '~/pages/PersonalInfo/Personalinfo';
import Headertop from '../Headertop/Headertop';

function Layout() {
  const navigate = useNavigate();
  const items = [
    {
      label: 'Trang chủ',
      key: '/',
      icon: <HomeOutlined />,
    },
    {
      label: 'Sinh viên',
      key: '/student',
      icon: <UnorderedListOutlined />,
    },
    {
      label: 'Quản lí sinh viên',
      key: '/studentmanagement',
      icon: <FolderOutlined />,
    },
    {
      label: 'Quản lí sản phẩm',
      key: '/productmanagement',
      icon: <FolderOutlined />,
    },
    {
      label: 'Bảng tin',
      key: '/newfeed',
      icon: <ReadOutlined />,
    },
  ];
  return (
    <div>
      <Headertop />
      <div style={{ display: 'flex' }}>
        <Menu
          style={{ backgroundColor: '#ccc' }}
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
        <Route
          path="/studentmanagement"
          element={<ManagementStudent />}
        ></Route>
        <Route
          path="/productmanagement"
          element={<ManagementProduct />}
        ></Route>
        <Route path="/personalinfo" element={<Personalinfo />}></Route>
      </Routes>
    </div>
  );
}
export default Layout;
