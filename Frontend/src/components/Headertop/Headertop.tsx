import { UserOutlined } from '@ant-design/icons';
import './headertop.scss';
const Headertop = () => {
  return (
    <div className="headertop">
      <div className="hdleft">Quản lí sinh viên</div>
      <div className="hdright">
        Thông tin <UserOutlined />
      </div>
    </div>
  );
};

export default Headertop;
