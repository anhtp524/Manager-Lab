import { GoogleOutlined, PhoneOutlined } from '@ant-design/icons'
import { Collapse, CollapseProps, Tabs, TabsProps } from 'antd'
import { Projects, Students, Teachers } from './components'
import { useMemo } from 'react'

const LabDetail = () => {
  const items: CollapseProps['items'] = useMemo(
    () => [
      {
        key: 1,
        label: <span className='header'>Phòng nghiên cứu vật tư</span>,
        children: (
          <div>
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
    ],
    []
  )

  const tabs: TabsProps['items'] = useMemo(() => {
    return [
      {
        key: '1',
        label: 'Students',
        children: <Students />
      },
      {
        key: '2',
        label: 'Teachers',
        children: <Teachers />
      },
      {
        key: '3',
        label: 'Projects',
        children: <Projects />
      }
    ]
  }, [])
  return (
    <div className='labdetail'>
      <Collapse items={items} defaultActiveKey={['1']} bordered={true} />
      <div className='tab-lab-details'>
        <Tabs defaultActiveKey='2' destroyInactiveTabPane items={tabs} />
      </div>
    </div>
  )
}

export default LabDetail
