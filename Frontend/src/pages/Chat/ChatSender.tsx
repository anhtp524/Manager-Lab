import { Avatar } from 'antd'

interface IChatSenderProps {
  isSender?: boolean
  name: string
}

function ChatSender({ isSender, name }: IChatSenderProps) {
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
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia, cupiditate! Iusto reiciendis a molestiae
          nobis, officia doloribus. Magni, excepturi. Molestias ducimus consequatur vitae voluptas, eum odio dicta
          ratione tenetur doloribus?
        </p>
      </div>
    </div>
  )
}

export default ChatSender
