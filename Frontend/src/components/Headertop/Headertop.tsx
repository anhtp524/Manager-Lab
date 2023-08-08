import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './headertop.scss';
const Headertop = () => {
  const navigate = useNavigate();
  const handleClickgotoInfoPage = () => {
    // navigate('/personalinfo');
  };

  return (
    <div className="headertop">
      <div className="hdleft">Quản lí sinh viên</div>
      <div onClick={handleClickgotoInfoPage} className="hdright">
        Thông tin <UserOutlined />
      </div>
    </div>
  );
};

export default Headertop;
