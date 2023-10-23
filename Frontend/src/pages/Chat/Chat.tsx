import Search from 'antd/es/input/Search'
import './chat.scss'
import Conversation from './Conversation'
import ChatSender from './ChatSender'
import { Button , Input } from 'antd'
import { SendOutlined } from '@ant-design/icons'
import { useRef, useState, useEffect } from 'react'
import io from 'socket.io-client';


const socket = io('http://localhost:8000');

interface ISenderItem {
  isSender: boolean;
  name: string;
  msg: string;
}
function Chat() {

  const inputChat = useRef(null);
  const [chatMsgValue, setChatMsgValue] = useState("")

  const [chatList, setSendItem] = useState<ISenderItem[]>([]);
  const handlePutChat = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) { 
      let chatMsg = inputChat.current?.input.value;
      setSendItem([
        ...chatList,
        {
          isSender: true,
          name: "Dennis Dang",
          msg: chatMsg
        }
      ]);
      setChatMsgValue("")
      sendMessage(chatMsg)
    }
  }
  const renderListChatMsg = () => {
    return chatList.map((chatItem, index) => {
      return <ChatSender key={index} isSender={chatItem.isSender} name={chatItem.name} />
    })
  }

  const changeMsgInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatMsgValue(e.target.value);
  }

  const sendMessage = (message: string) => {
    socket.emit('sendMessage', message);
   }
  useEffect(() => {
    renderListChatMsg();
  }, [chatList])
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
          {
            renderListChatMsg()
          }
        </div>
        <div className='chat-input'>
          <Input 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeMsgInput(e)} 
            value={chatMsgValue} 
            ref={inputChat} 
            onPressEnter={(event: React.KeyboardEvent<HTMLInputElement>) => handlePutChat(event)} placeholder="Basic usage" 
          />
          <Button type='primary' icon={<SendOutlined />} size='large' />
        </div>
      </div>
    </div>
  )
}

export default Chat;

