import { EllipsisOutlined, FundViewOutlined } from '@ant-design/icons'
import { Avatar, Card } from 'antd'

export interface ILabchildren {
  title: string
  img: string
}
const { Meta } = Card
const LabsChildren = (props: ILabchildren) => {
  const { title, img } = props
  return (
    <div className='labschildren'>
      <Card
        style={{ width: 280 }}
        cover={<img alt='example' src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png' />}
        actions={[<FundViewOutlined key='setting' />, <EllipsisOutlined key='ellipsis' />]}
      >
        <Meta
          avatar={<Avatar src='https://dongphucgiadinh.com/wp-content/uploads/2022/09/logo-dai-hoc-bach-khoa.png' />}
          title={title}
          description={img}
        />
      </Card>
    </div>
  )
}
export default LabsChildren
