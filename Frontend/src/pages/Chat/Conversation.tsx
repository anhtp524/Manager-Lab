import { Avatar } from 'antd'

export interface IConversationProps {
  name: string
  onClick: VoidFunction
}

function Conversation({ name, onClick }: IConversationProps) {
  return (
    <div className='conversation' onClick={onClick}>
      <div className='profile-avatar'>
        <Avatar style={{ backgroundColor: 'orange', verticalAlign: 'middle' }} size='large' gap={10}>
          H
        </Avatar>
      </div>
      <div className='profile-info'>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <strong>{name}</strong>
          <div style={{ color: 'gray', fontSize: '14px' }}>12:30</div>
        </div>
        <p style={{ color: 'gray' }}>This is the latest message</p>
      </div>
    </div>
  )
}

export default Conversation
