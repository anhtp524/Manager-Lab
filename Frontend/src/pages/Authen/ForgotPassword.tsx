import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, FormInstance, Input, Typography } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import fetchHandler from '~/api/axios'
import Image from '~/assets/Image'
import { useHandlingApi } from '~/common/context/useHandlingApi'

const ruleRequired = (msg: string, isRequired: boolean) => {
  return {
    required: isRequired,
    message: msg
  }
}

function ForgotPassword() {
  const [form] = useForm()
  const { showLoading, closeLoading } = useHandlingApi()
  const navigate = useNavigate()
  const onFinish = async (form: FormInstance<Dennis>) => {
    const email = form.getFieldValue('email')
    try {
      showLoading()
      const res = await fetchHandler.post<Dennis>('/user/forgetpassword', email)

      if (res && res.data) {
        toast.info('Please check your email inbox!')
        navigate('/auth/login', { replace: true })
      }
    } catch (error: Dennis) {
      console.error(error)
    } finally {
      closeLoading()
    }
  }

  return (
    <div className='login-main'>
      <div className='login-logo'>
        <img src={Image.logoUat} />
      </div>
      <div className='login-tag'>
        <Typography.Title>Reset password</Typography.Title>
        <Form
          name='normal_login'
          className='login-form'
          initialValues={{
            remember: true
          }}
          form={form}
          onFinish={() => onFinish(form)}
        >
          <Form.Item name='email' rules={[ruleRequired('Please input your Username!', true)]}>
            <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Email address' />
          </Form.Item>
          {/*  */}
          <Form.Item>
            <Button type='primary' htmlType='submit' className='login-form-button'>
              Send email to reset password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default ForgotPassword
