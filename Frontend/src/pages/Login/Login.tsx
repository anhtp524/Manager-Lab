import { Button, Checkbox, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import './login.scss'

const Login = () => {
  const navigate = useNavigate()
  // const handleLoginStudent = () => {};
  const onFinish = (values: Dennis) => {
    console.log(values)
    localStorage.setItem('accessToken', true)
    navigate('/')
  }

  const onFinishFailed = (errorInfo: Dennis) => {
    console.log('Failed:', errorInfo)
  }

  type FieldType = {
    username?: string
    password?: string
    remember?: string
  }

  return (
    <div className='login-page'>
      <div className='logincontent'>
        <div className='header'>Đăng nhập để truy cập hệ thống</div>
        <Form
          name='basic'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item<FieldType>
            label='Tài khoản'
            name='username'
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label='Mật khẩu'
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType> name='remember' valuePropName='checked' wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' htmlType='submit'>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
