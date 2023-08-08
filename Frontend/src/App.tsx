import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage/Homepage'
import Login from './pages/Login/Login'

function App() {
  return (
    <div style={{ height: '100%' }} className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/homepage' element={<Homepage />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
