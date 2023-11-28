import { useAuth } from '~/common/context/useAuth'
import './homepage.scss'
import Image from '~/assets/Image'
import { useNavigate } from 'react-router-dom'
import { Modal } from 'antd'

const Homepage = () => {
  const { profileUserInfo } = useAuth()
  const navigate = useNavigate()
  const redirect = () => {
    if (profileUserInfo?.lab) {
      navigate('/labs/' + profileUserInfo?.lab?.id, { replace: true })
    } else {
      Modal.confirm({
        title: "You've not had a lab yet",
        content: 'Jump to register lab page?',
        onOk: () => navigate('/labs', { replace: true })
      })
    }
  }
  return (
    <div className='homepage'>
      <div className='left'>
        <div className='welcome'>
          Welcome to <div className='system-name'>Laboratory Management System</div>
        </div>
        <div className='description'>
          Lab management involves overseeing personnel, project, and operations to ensure the efficient and safe
          functioning of a laboratory environment.
        </div>
        <div className='go-to-lab' onClick={redirect}>
          <div>Go to your lab</div>
        </div>
      </div>
      <div className='right'>
        <img src={Image.home} alt='home' />
      </div>
    </div>
  )
}

export default Homepage
