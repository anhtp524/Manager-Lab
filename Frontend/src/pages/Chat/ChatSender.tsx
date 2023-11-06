import { Avatar } from 'antd'

interface IChatSenderProps {
  isSender?: boolean
  name: string
  message: string
}

function ChatSender({ isSender, name, message }: IChatSenderProps) {
  return (
    <div className={`chat-sender ${isSender ? 'to-right' : 'to-left'}`}>
      <div>
        <Avatar style={{ backgroundColor: 'orange', verticalAlign: 'middle' }} size='large'>
          {name}
        </Avatar>
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
