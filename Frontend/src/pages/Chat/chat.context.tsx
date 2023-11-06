import { createContext, useCallback, useState, useContext } from 'react'
import chatAPI, { ListBoxChat } from '~/api/chat.api'
import { useHandlingApi } from '~/common/context/useHandlingApi'

export interface IChatBoxContext {
  chatBoxes: ListBoxChat
  getAllChatBoxes: VoidFunction
  abortController?: AbortController
}

export interface IProps {
  children?: React.ReactNode
}

export const ChatBoxContext = createContext<IChatBoxContext>({
  chatBoxes: [],
  getAllChatBoxes: () => 1,
  abortController: undefined
})

export const ChatBoxProvider = (props: IProps) => {
  const [abortController] = useState<AbortController>(new AbortController())
  const { showLoading, closeLoading } = useHandlingApi()
  const [chatBoxes, setChatBoxes] = useState<ListBoxChat>([])

  const handleGetAllChatBoxes = useCallback(async () => {
    showLoading()
    try {
      const response = await chatAPI.getAllBoxChat({ signal: abortController.signal })
      if (response && response.data) {
        let newChatBoxes = [...response.data]
        newChatBoxes = newChatBoxes.map((item) => {
          return { ...item, key: item.id }
        })
        setChatBoxes(newChatBoxes)
      }
    } catch (error: Dennis) {
      console.error(error)
    } finally {
      closeLoading()
    }
  }, [abortController])

  return (
    <ChatBoxContext.Provider value={{ chatBoxes: chatBoxes, getAllChatBoxes: handleGetAllChatBoxes, abortController }}>
      {props.children}
    </ChatBoxContext.Provider>
  )
}

export const ChatBoxConsumer = ChatBoxContext.Consumer

export const useGetAllChatBoxes = () => useContext(ChatBoxContext)
