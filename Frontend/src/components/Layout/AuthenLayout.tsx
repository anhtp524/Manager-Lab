import React from 'react'
import { Outlet } from 'react-router-dom'
import './authenlayout.scss'

function AuthenLayout() {
  return (
    <div className='main-auth'>
      <div className='content'>
        <Outlet />
      </div>
    </div>
  )
}

export default AuthenLayout
