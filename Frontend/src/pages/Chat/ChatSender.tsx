import { Avatar } from 'antd'
import UserAvatar from '../../components/UserAvatar/UserAvatar'

interface IChatSenderProps {
  isSender?: boolean
  name: string
  message: string
}

function ChatSender({ isSender, name, message }: IChatSenderProps) {
  return (
    <div className={`chat-sender ${isSender ? 'to-right' : 'to-left'}`}>
      <div>
        <UserAvatar name={name} size='large' />
      </div>
      <div className='info'>
        <strong>{name}</strong>
        <p style={{ marginTop: '12px' }} className={isSender ? 'sender' : 'receiver'}>
          {message}
        </p>
      </div>
    </div>
  )
}

export default ChatSender
