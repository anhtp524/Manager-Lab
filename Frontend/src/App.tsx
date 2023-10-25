import { RouterProvider } from 'react-router-dom'
import 'antd/dist/reset.css'
import router from './routes/mainroutes'
import { useHandlingApi } from './common/context/useHandlingApi'
import ActionFailed from './common/components/ActionFailed/ActionFailed'
import Lazyloading from './common/components/lazyloading/Lazyloading'
import ReactDOM from 'react-dom'
import './App.scss'

function App() {
  const { hasError, closeError, isLoading } = useHandlingApi()
  return (
    <>
      <RouterProvider router={router} />
      <ActionFailed open={hasError} onClose={closeError} />
      {isLoading &&
        ReactDOM.createPortal(
          <div className='loading-container'>
            <Lazyloading />
          </div>,
          document.body
        )}
    </>
  )
}

export default App
