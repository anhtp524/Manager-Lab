import { RouterProvider } from 'react-router-dom'
import 'antd/dist/reset.css'
import router from './routes/mainroutes'

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
