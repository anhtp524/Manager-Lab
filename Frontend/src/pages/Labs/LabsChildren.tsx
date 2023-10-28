import { EllipsisOutlined, FundViewOutlined } from '@ant-design/icons'
import { Avatar, Card } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Lab } from '~/api/lab.api'

export interface ILabchildren {
  data: Lab
}
const { Meta } = Card
const LabsChildren = (props: ILabchildren) => {
  const { data } = props
  const navigate = useNavigate()
  const handleNavigate = (id: string) => {
    navigate(`/labsdetail/${id}`)
  }

  return (
    <div className='labschildren'>
      <Card
        style={{ width: 280 }}
        cover={
          <img
            alt='example'
            src='https://cms.luatvietnam.vn/uploaded/Images/Original/2019/06/13/nghien-cuu-khoa-hoc_1306163907.jpg'
          />
        }
        actions={[<FundViewOutlined onClick={() => handleNavigate(data.id)} />, <EllipsisOutlined key='ellipsis' />]}
      >
        <Meta
          avatar={<Avatar src='https://dongphucgiadinh.com/wp-content/uploads/2022/09/logo-dai-hoc-bach-khoa.png' />}
          title={data.name}
          description={data.description}
        />
      </Card>
    </div>
  )
}
export default LabsChildren
