import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'
import { Avatar, Card } from 'antd'

const { Meta } = Card
const LabsChildren = () => {
  return (
    <div className='labschildren'>
      <Card
        style={{ width: 280 }}
        cover={<img alt='example' src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png' />}
        actions={[<SettingOutlined key='setting' />, <EditOutlined key='edit' />, <EllipsisOutlined key='ellipsis' />]}
      >
        <Meta
          avatar={<Avatar src='https://xsgames.co/randomusers/avatar.php?g=pixel' />}
          title='Card title'
          description='This is the description'
        />
      </Card>
    </div>
  )
}

export default LabsChildren
