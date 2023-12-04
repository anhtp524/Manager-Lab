import { EllipsisOutlined, FundViewOutlined } from '@ant-design/icons'
import { Avatar, Card, Tag } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Lab } from '~/api/lab.api'
import { useAuth } from '~/common/context/useAuth'
import { useHandlingApi } from '~/common/context/useHandlingApi'
import { Role } from '~/routes/util'

export interface ILabchildren {
  data: Lab
}
const { Meta } = Card
const LabsChildren = (props: ILabchildren) => {
  const { data } = props
  const { showLoading } = useHandlingApi()
  const { authInfo, profileUserInfo } = useAuth()
  const navigate = useNavigate()
  const handleNavigate = (id: string) => {
    showLoading()
    navigate(`/labs/${id}`)
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
        actions={[<div onClick={() => handleNavigate(data.id)} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8}}><FundViewOutlined  /> View</div>]}
      >
        <Meta
          avatar={<Avatar src='https://th.bing.com/th/id/R.96bc0fa883a40155afe8a468c6b5eb9e?rik=F7YmHfEQIx0osg&pid=ImgRaw&r=0' />}
          title={data.name}
        />
      </Card>
      {authInfo?.roles === Role.Student &&
        profileUserInfo?.lab &&
        profileUserInfo.lab.id === data.id &&
        !profileUserInfo.isApproveToLab && (
          <div className='approve-status'>
            <Tag color='blue'>Waiting for approve</Tag>
          </div>
        )}
    </div>
  )
}
export default LabsChildren
