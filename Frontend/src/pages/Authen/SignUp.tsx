import { useState } from 'react'
import { Button, CheckboxOptionType, DatePicker, Form, Input, Radio, RadioChangeEvent, Typography } from 'antd'
import Image from '~/assets/Image'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { Role, RoutePath } from '~/routes/util'
import { Store } from 'antd/es/form/interface'
import { useHandlingApi } from '~/common/context/useHandlingApi'
import fetchHandler from '~/api/axios'
import { toast } from 'react-toastify'

enum IChoiseTypeSignUp {
  Student = 'studentAdd',
  Teacher = 'teacherAdd'
}

function SignUp() {
  const navigate = useNavigate()
  //   const [form] = Form.useForm()
  const [isStudent, setIsStudent] = useState<boolean>(true)
  const { showLoading, closeLoading } = useHandlingApi()

  const options: Array<CheckboxOptionType | string | number> = [
    { label: 'Student', value: IChoiseTypeSignUp.Student },
    { label: 'Teacher', value: IChoiseTypeSignUp.Teacher }
  ]

  const handleRadioChange = (e: RadioChangeEvent) => {
    if (e.target.value === IChoiseTypeSignUp.Teacher) {
      setIsStudent(false)
    } else setIsStudent(true)
  }

  const onRenderInputType = () => {
    if (isStudent) {
      return (
        <div>
          <Form.Item name={'studentCode'}>
            <Input placeholder='Student Code' />
          </Form.Item>
          <Form.Item name={'studentName'}>
            <Input placeholder='Name' />
          </Form.Item>
          <Form.Item name={'dateOfBirthStudent'}>
            <DatePicker placeholder='Date of Birth' />
          </Form.Item>
          <Form.Item name={'classStudent'}>
            <Input placeholder='Class' />
          </Form.Item>
          <Form.Item name={'phoneNumberStudent'}>
            <Input placeholder='Phone Number' />
          </Form.Item>
        </div>
      )
    }
    return (
      <div>
        <Form.Item name={'teacherName'}>
          <Input placeholder='Name' />
        </Form.Item>
        <Form.Item name={'dateOfBirthTeacher'}>
          <DatePicker placeholder='Date of Birth' />
        </Form.Item>
        <Form.Item name={'department'}>
          <Input placeholder='department' />
        </Form.Item>
        <Form.Item name={'major'}>
          <Input placeholder='Major' />
        </Form.Item>
        <Form.Item name={'phoneNumberTeacher'}>
          <Input placeholder='Phone Number' />
        </Form.Item>
      </div>
    )
  }

  const onFinish = async (values: Store) => {
    const aStudent = values.dateOfBirthStudent
    const aTeacher = values.dateOfBirthTeacher
    const dateOfBirthStudent = `${aStudent?.$y}-${aStudent?.$M + 1}-${aStudent?.$D}`
    const dateOfBirthTeacher = `${aTeacher?.$y}-${aTeacher?.$M + 1}-${aTeacher?.$D}`
    const body = isStudent
      ? {
          email: values.email,
          password: values.password,
          role: Role.Student,
          studentAdd: {
            studentCode: values.studentCode,
            name: values.studentName,
            dateOfBirth: dateOfBirthStudent,
            class: values.classStudent,
            phoneNumber: values.phoneNumberStudent
          }
        }
      : {
          email: values.email,
          password: values.password,
          role: Role.Teacher,
          teacherAdd: {
            name: values.teacherName,
            dateOfBirth: dateOfBirthTeacher,
            department: values.department,
            major: values.major,
            phoneNumber: values.phoneNumberTeacher
          }
        }
    try {
      showLoading()
      const res = await fetchHandler.post<{ id: GUID; accessToken: string; role: Role }>('/user/adduser', body)
      if (res.status === 201) {
        closeLoading()
        toast.success('Create account successfully', {
          autoClose: 2000,
          theme: 'light'
        })
        navigate('/auth/login')
      } else {
        toast.success('Create account failed', {
          autoClose: 2000,
          theme: 'light'
        })
      }
    } catch (error: Dennis) {
      closeLoading()
      console.error(error)
    }
  }

  return (
    <div className='signup-main'>
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
          <Form.Item
            name='email'
            rules={[
              { required: true, message: 'Please input your email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Email address' />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[
              { required: true, message: 'Please input your password' },
              { min: 6, message: 'Password must be at least 6 characters' }
            ]}
          >
            <Input prefix={<LockOutlined className='site-form-item-icon' />} type='password' placeholder='Password' />
          </Form.Item>
          <Form.Item
            name='myConfirmPassword'
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password'
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match'))
                }
              })
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className='site-form-item-icon' />}
              placeholder='Confirm your password'
            />
          </Form.Item>
          <Form.Item name={'choiseType'} initialValue={IChoiseTypeSignUp.Student}>
            <Radio.Group options={options} onChange={handleRadioChange} />
          </Form.Item>
          {onRenderInputType()}
          <Form.Item>
            <Button type='primary' htmlType='submit' className='login-form-button'>
              Sign Up
            </Button>
          </Form.Item>
          <div className='have-account'>
            <Form.Item>
              <Typography.Text>Don't have an account?</Typography.Text>
              <Link to={RoutePath.Login}>Log In</Link>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default SignUp
