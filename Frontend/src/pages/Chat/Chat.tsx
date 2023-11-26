import Search from 'antd/es/input/Search'
import './chat.scss'
import Conversation from './Conversation'
import ChatSender from './ChatSender'
import { Button, Input, List, Modal, Space, Tag } from 'antd'
import { PlusOutlined, SendOutlined } from '@ant-design/icons'
import { useRef, useState, useEffect } from 'react'
import io from 'socket.io-client'
import userAPI from '~/api/user.api'
import { debounce } from 'lodash'
import chatAPI, { BoxChat } from '~/api/chat.api'
import { toast } from 'react-toastify'
import { useHandlingApi } from '~/common/context/useHandlingApi'
import { useGetAllChatBoxes } from './chat.context'
import { useAuth } from '~/common/context/useAuth'
import messageAPI, { ListMessages } from '~/api/message.api'
import UserAvatar from '~/components/UserAvatar/UserAvatar'

const socket = io('http://localhost:8000')

function Chat() {
  const { showLoading, closeLoading } = useHandlingApi()
  const { profileUserInfo } = useAuth()
  const { chatBoxes, getAllChatBoxes, abortController } = useGetAllChatBoxes()
  const inputChat = useRef(null)
  const [chatMsgValue, setChatMsgValue] = useState('')
  const [showListUser, setShowListUser] = useState<boolean>(false)
  const [searchUserLoading, setSearchUserLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [selectedUser, setSelectedUser] = useState<{ name: string; userId: GUID; index: number }[]>([])
  const [users, setUsers] = useState<{ name: string; userId: GUID; index: number }[]>([])
  const [userList, setUserList] = useState<{ userId: GUID; name: string }[]>([])
  const [chatBoxName, setChatBoxName] = useState<string>('')
  const [boxChatInfo, setBoxChatInfo] = useState<{ id: GUID; name: string }>()

  const [chatList, setChatList] = useState<ListMessages>([])

  const ref = useRef<string>()
  const chatContentRef = useRef<HTMLDivElement | null>(null)

  // const chatListRef = useRef<ListMessages>([])

  useEffect(() => {
    getAllChatBoxes()
    return () => {
      abortController?.abort()
    }
  }, [])

  useEffect(() => {
    socket.on(`receiveMessage_${boxChatInfo?.id}`, (args: Dennis) => {
      args.sender !== profileUserInfo?.userId &&
        setChatList((chatList) => [
          ...chatList,
          {
            message: args.message,
            isSender: false,
            createdDate: new Date(),
            user: {
              userId: args.sender,
              name: args.userName
            }
          }
        ])
    })
  }, [boxChatInfo])

  const handlePutChat = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      let chatMsg = inputChat.current?.input.value
      setChatList((chatList) => [
        ...chatList,
        {
          isSender: true,
          user: {
            userId: profileUserInfo?.userId as GUID,
            name: profileUserInfo?.name as string
          },
          message: chatMsg,
          createdDate: new Date()
        }
      ])
      setChatMsgValue('')
      sendMessage({
        sender: profileUserInfo?.userId as GUID,
        message: chatMsg,
        boxChatId: boxChatInfo?.id as GUID,
        userName: profileUserInfo?.name as string
      })
    }
  }

  const changeMsgInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatMsgValue(e.target.value)
  }

  const sendMessage = (body: { sender: GUID; message: string; boxChatId: GUID; userName: string }) => {
    socket.emit('sendMessage', body)
  }

  const handleRemove = (item: { userId: GUID; name: string }) => {
    const userListCopy = [...userList]
    let selectedUserCopy = [...selectedUser]
    selectedUserCopy = selectedUserCopy.filter((x) => x.userId !== item.userId)
    userListCopy.push(item)
    setSelectedUser(selectedUserCopy)
    setUserList(userListCopy)
  }

  const handleRemovePeople = (id: GUID) => {
    let usersCopy = [...users]
    usersCopy = usersCopy.filter((x) => x.userId !== id)
    setChatBoxName(usersCopy.map((x) => x.name).join(', '))
    setUsers(usersCopy)
  }

  const handleSelectPeople = (item: { name: string; userId: GUID; index: number }) => {
    const selectedUserCopy = [...selectedUser]
    selectedUserCopy.push({ name: item.name, userId: item.userId, index: item.index })
    const userListCopy = [...userList]
    const filteredTeacherList = userListCopy.filter((x) => x.userId !== item.userId)
    setSelectedUser(selectedUserCopy)
    setUserList(filteredTeacherList)
  }

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value
    ref.current = search

    setShowListUser(true)
    setSearchUserLoading(!!search)

    debounceLoadPeople(search)
  }

  const handleSearchPeople = async (search: string) => {
    if (!search) {
      setShowListUser(false)
      setUserList([])
      setSelectedUser([])
      return
    }
    try {
      const response = await userAPI.searchByName({ searchName: search })
      if (response && response.data) {
        setSearchUserLoading(false)
        if (users && users.length > 0) {
          const filteredStudentList = response.data.filter(
            (item) => item.userId !== profileUserInfo?.userId && !users.map((x) => x.userId).includes(item.userId)
          )
          setUserList(filteredStudentList)
        } else {
          setUserList(response.data.filter((item) => item.userId !== profileUserInfo?.userId))
        }
      }
    } catch (error: Dennis) {
      console.error(error)
    }
  }
  const debounceLoadPeople = debounce(handleSearchPeople, 800)

  const handleCreateChatBox = async () => {
    showLoading()
    try {
      const response = await chatAPI.create({
        name: chatBoxName.concat(`, ${profileUserInfo?.name}`),
        userId: users.filter((x) => x.userId !== profileUserInfo?.userId).map((x) => x.userId)
      })
      if (response) {
        toast.success('Successfully created!')
        getAllChatBoxes()
        onReset()
      }
    } catch (error: Dennis) {
      console.error(error)
    } finally {
      closeLoading()
    }
  }

  const onReset = () => {
    setUserList([])
    setSelectedUser([])
    setUsers([])
    ref.current = ''
    setOpen(false)
    setChatBoxName('')
  }

  const handleGetListMsg = async (item: BoxChat) => {
    showLoading()
    try {
      const response = await messageAPI.getMsg(item.id)
      if (response && response.data) {
        const data = response.data.map((x) => {
          return {
            ...x,
            isSender: x.user.userId === profileUserInfo?.userId
          }
        })
        setBoxChatInfo(item)
        setChatList(data)
      }
    } catch (error: Dennis) {
      console.error(error)
    } finally {
      closeLoading()
    }
  }

  useEffect(() => {
    const el = chatContentRef.current
    if (el === null) return
    el.scrollTo(0, el.scrollHeight)
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
            addonBefore={
              <div onClick={() => setOpen(true)}>
                <PlusOutlined />
              </div>
            }
          />
        </div>
        <div className='message-list'>
          {chatBoxes && chatBoxes.length > 0 ? (
            chatBoxes.map((item, _) => (
              <Conversation key={item.id} name={item.name} onClick={() => handleGetListMsg(item)} />
            ))
          ) : (
            <div />
          )}
        </div>
      </div>
      <div className='chat-box'>
        <div className='person-info-bar'>
          <strong>{boxChatInfo?.name}</strong>
        </div>
        <div className='chat-content' ref={chatContentRef}>
          {chatList.map((chatItem, index) => {
            return (
              <ChatSender
                key={index}
                isSender={chatItem.isSender}
                name={chatItem.user.name}
                message={chatItem.message}
              />
            )
          })}
        </div>
        <div className='chat-input'>
          <Input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeMsgInput(e)}
            value={chatMsgValue}
            ref={inputChat}
            onPressEnter={(event: React.KeyboardEvent<HTMLInputElement>) => handlePutChat(event)}
            placeholder='Basic usage'
            disabled={!boxChatInfo}
          />
          <Button type='primary' icon={<SendOutlined />} size='large' disabled={!boxChatInfo} />
        </div>
      </div>

      <Modal
        open={open}
        title='Create box chat'
        centered={true}
        width='500px'
        okText='Create'
        okButtonProps={{
          disabled: users && users.length === 0
        }}
        onOk={handleCreateChatBox}
        onCancel={onReset}
        maskClosable={false}
        destroyOnClose
      >
        <div style={{ width: '100%' }} className='project-listStudents'>
          <Search
            placeholder='Search for users'
            allowClear
            size='middle'
            loading={searchUserLoading}
            onChange={(e) => onSearch(e)}
          />
          <div className='people-picker' style={showListUser ? {} : { display: 'none' }}>
            <div className='tag-container' style={{ padding: 4, display: 'flex', flexWrap: 'wrap' }}>
              {selectedUser && selectedUser.length > 0 ? (
                selectedUser.map((item) => (
                  <div key={item.userId}>
                    <Tag color='magenta' onClose={() => handleRemove(item)} closeIcon>
                      {item.name}
                    </Tag>
                  </div>
                ))
              ) : (
                <div />
              )}
            </div>
            <List
              itemLayout='horizontal'
              dataSource={userList}
              renderItem={(item, index) => (
                <List.Item onClick={() => handleSelectPeople({ name: item.name, userId: item.userId, index: index })}>
                  <List.Item.Meta
                    avatar={<UserAvatar name={item.name} />}
                    title={<strong style={{ fontSize: 16 }}>{item.name}</strong>}
                    style={{ alignItems: 'center', padding: '8px' }}
                    className={`people-item`}
                  />
                </List.Item>
              )}
              footer={
                <Space style={{ justifyContent: 'flex-end', width: '100%', paddingRight: '8px' }}>
                  <Button
                    type='default'
                    onClick={() => {
                      setSelectedUser([])
                      setShowListUser(false)
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type='primary'
                    disabled={selectedUser.length === 0}
                    onClick={() => {
                      setUsers([...users, ...selectedUser])
                      setChatBoxName([...users, ...selectedUser].map((x) => x.name).join(', '))
                      setSelectedUser([])
                      setShowListUser(false)
                    }}
                  >
                    OK
                  </Button>
                </Space>
              }
            />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {users && users.length > 0 ? (
              users.map((item) => (
                <div key={item.userId} style={{ marginTop: 8 }}>
                  <Tag
                    color='purple'
                    style={{ fontSize: 14 }}
                    closeIcon
                    onClose={() => handleRemovePeople(item.userId)}
                  >
                    {item.name}
                  </Tag>
                </div>
              ))
            ) : (
              <div />
            )}
          </div>
          <div style={{ marginTop: 8 }}>
            <div style={{ fontWeight: 500, marginBottom: 4 }}>Name</div>
            <Input disabled={true} value={chatBoxName} />
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Chat
