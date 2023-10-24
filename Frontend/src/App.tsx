import { RouterProvider } from 'react-router-dom'
import 'antd/dist/reset.css'
import router from './routes/mainroutes'
import { useHandlingApi } from './common/context/useHandlingApi'
import ActionFailed from './common/components/ActionFailed/ActionFailed'

function App() {
  const { hasError, closeError } = useHandlingApi()
  return (
    <>
      <RouterProvider router={router} />
      <ActionFailed open={hasError} onClose={closeError} />
    </>
  )
}

export default App
