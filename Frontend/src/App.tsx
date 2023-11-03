import { RouterProvider } from 'react-router-dom'
import 'antd/dist/reset.css'
import router from './routes/mainroutes'
import { useHandlingApi } from './common/context/useHandlingApi'
import Lazyloading from './common/components/lazyloading/Lazyloading'
import ReactDOM from 'react-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.scss'

function App() {
  const { isLoading } = useHandlingApi()
  return (
    <>
      <RouterProvider router={router} />
      {/* <ActionFailed open={hasError} onClose={closeError} /> */}
      <ToastContainer
        closeOnClick={false}
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
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
