import './login.scss'
import { Form, Input, Button, Checkbox, Typography } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import Image from '~/assets/Image'
import fetchHandler from '~/api/axios'
import { Store } from 'antd/es/form/interface'
import { Link, useNavigate } from 'react-router-dom'
import { useHandlingApi } from '~/common/context/useHandlingApi'
import { useAuth } from '~/common/context/useAuth'
import { Role, RoutePath } from '~/routes/util'

function Login() {
  const navigate = useNavigate()
  const { showLoading, closeLoading } = useHandlingApi()
  const { setAuthInfo } = useAuth()
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
    console.log(values)

    const body = {
      email: values.email,
      password: values.password
    }
    try {
      showLoading()
      const res = await fetchHandler.post<{ id: GUID; accessToken: string; role: Role }>('/authentication/login', body)

      if (res.status === 201) {
        setAuthInfo({
          roles: res.data.role
        })
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
        <Typography.Title>Wellcome back</Typography.Title>
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
          <div className='have-account'>
            <Form.Item>
              <Typography.Text>Don't have an account?</Typography.Text>
              <Link to={RoutePath.SignUp}>Sign Up</Link>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Login
