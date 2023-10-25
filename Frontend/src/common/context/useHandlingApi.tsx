import { createContext, useContext, useState } from 'react'

export interface IContext {
  isLoading: boolean
  hasError: boolean
  showLoading: VoidFunction
  closeLoading: VoidFunction
  showError: VoidFunction
  closeError: VoidFunction
}

export interface IProps {
  children?: React.ReactNode
}

export const LoadingContext = createContext<IContext>({
  isLoading: false,
  hasError: false,
  showLoading: () => 1,
  closeLoading: () => 1,
  showError: () => 1,
  closeError: () => 1
})

export const LoadingProvider = (props: IProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [hasError, setHasError] = useState<boolean>(false)

  const showLoading = () => {
    document.body.classList.add('hide-scrollbar')
    setLoading(true)
  }
  const closeLoading = () => {
    setLoading(false)
  }

  const showError = () => {
    setLoading(false)
    setHasError(true)
  }

  const closeError = () => {
    setHasError(false)
  }

  return (
    <LoadingContext.Provider value={{ isLoading: loading, hasError, showLoading, closeLoading, showError, closeError }}>
      {props.children}
    </LoadingContext.Provider>
  )
}

export const LoadingConsumer = LoadingContext.Consumer

export const useHandlingApi = () => useContext(LoadingContext)
