import Search from 'antd/es/input/Search'
import './chat.scss'
import Conversation from './Conversation'
import ChatSender from './ChatSender'
import TextArea from 'antd/es/input/TextArea'
import { Button } from 'antd'
import { SendOutlined } from '@ant-design/icons'
function Chat() {
  return (
    <div className='chat-container'>
      <div className='chat-list'>
        <div className='search'>
          <Search
            placeholder='Search for messages'
            allowClear
            // enterButton='Search'
            size='large'
            //   onSearch={onSearch}
          />
        </div>
        <div className='message-list'>
          {Array(50)
            .fill('Hello')
            .map((_, index) => (
              <Conversation key={index} />
            ))}
        </div>
      </div>
      <div className='chat-box'>
        <div className='person-info-bar'>
          <strong>Dennis Dang</strong>
        </div>
        <div className='chat-content'>
          <ChatSender name='Roy Vu' />
          <ChatSender isSender name='Dennis Dang' />
          <ChatSender name='Roy Vu' />
          <ChatSender isSender name='Dennis Dang' />
          <ChatSender name='Roy Vu' />
          <ChatSender isSender name='Dennis Dang' />
          <ChatSender name='Roy Vu' />
          <ChatSender isSender name='Dennis Dang' />
        </div>
        <div className='chat-input'>
          <TextArea rows={2} placeholder='Enter new message' size='large' />
          <Button type='primary' icon={<SendOutlined />} size='large' />
        </div>
      </div>
    </div>
  )
}

export default Chat
