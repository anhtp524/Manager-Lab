import './login.scss'
import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import Image from '~/assets/Image'
import fetchHandler from '~/api/axios'
import { Store } from 'antd/es/form/interface'
import { useNavigate } from 'react-router-dom'
import { useHandlingApi } from '~/common/context/useHandlingApi'

function Login() {
  const navigate = useNavigate()
  const { showLoading, closeLoading } = useHandlingApi()
  // const openNotificationWithIcon = (type: string | number, message: string, description: string) => {
  //   notification[type]({
  //     message: message,
  //     description: description
  //   })
  // }
  const ruleRequired = (msg: string, isRequired: boolean) => {
    return {
      required: isRequired,
      message: msg
    }
  }
  // const ruleMaxlength = (msg: string, maxlength: number) => {
  //   return {
  //     required: isRequired,
  //     message: msg
  //   }
  // }

  const onFinish = async (values: Store) => {
    const body = {
      email: values.email,
      password: values.password
    }
    try {
      showLoading()
      const res = await fetchHandler.post('/authentication/login', body)

      if (res.status === 201) {
        // const cookies = new Cookies()
        // cookies.set('tokenUser', res.data.accessToken, { path: '/' })
        closeLoading()
        localStorage.setItem('token', res.data.accessToken)
        navigate('/')
      }
    } catch (error: Dennis) {
      closeLoading()
      console.error(error)
    }
  }
  return (
    <div className='login-main'>
      <div className='login-logo'>
        <img src={Image.logoUat} />
      </div>
      <div className='login-tag'>
        <p className='login-title'>Wellcome back</p>
        <Form
          name='normal_login'
          className='login-form'
          initialValues={{
            remember: true
          }}
          onFinish={onFinish}
        >
          <Form.Item name='email' rules={[ruleRequired('Please input your Username!', true)]}>
            <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Email address' />
          </Form.Item>
          <Form.Item name='password' rules={[ruleRequired('Please input your Password!', true)]}>
            <Input prefix={<LockOutlined className='site-form-item-icon' />} type='password' placeholder='Password' />
          </Form.Item>
          <Form.Item>
            <Form.Item name='remember' valuePropName='checked' noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className='login-form-forgot' href='/auth/forgotpass'>
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' className='login-form-button'>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
