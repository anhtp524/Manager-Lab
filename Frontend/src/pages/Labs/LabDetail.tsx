import { GoogleOutlined, PhoneOutlined } from '@ant-design/icons'

const LabDetail = () => {
  return (
    <div className='labdetail'>
      <span className='header'>Phòng nghiên cứu vật tư</span>
      <div className='profile'>
        <div className='profileuser'>
          <img src='https://sep.hust.edu.vn/wp-content/uploads/002.065.00001.jpg' alt='' />
          <p>Trưởng phòng</p>
        </div>
        <div className='profilefuntion'>
          <div>
            <span>CHỨC NĂNG/NHIỆM VỤ:</span>
            <ul>
              <li>Nghiên cứu các hệ vật liệu cấu trúc nano ứng dụng trong y-sinh-nông-môi trường</li>
              <li>Phát triển và tối ưu các quy trình công nghệ trong lĩnh vực nghiên cứu</li>
            </ul>
          </div>
          <div>
            <span>HƯỚNG NGHIÊN CỨU CHÍNH:</span>
            <ul>
              <li>Nghiên cứu các hệ vật liệu cấu trúc nano ứng dụng trong y-sinh-nông-môi trường</li>
              <li>Phát triển và tối ưu các quy trình công nghệ trong lĩnh vực nghiên cứu</li>
            </ul>
          </div>
          <div className='contact'>
            <div>
              <GoogleOutlined />
              o0othanh2k1@gmail.com
            </div>
            <div>
              <PhoneOutlined />
              0335138003
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LabDetail
