import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import config from './config'
import { Modal } from 'antd'
import HttpStatusCode from './http'

const fetchHandler = axios.create(config)

// Request interceptor
fetchHandler.interceptors.request.use(
  (request: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    request.headers.Authorization = `Bearer ${token}`
    return request
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

fetchHandler.interceptors.response.use(
  (response) => {
    return response
  },
  (error: AxiosError) => {
    switch (error.response?.status) {
      case HttpStatusCode.NotFound:
        Modal.error({
          title: '404 Not Found'
        })
        break
      case HttpStatusCode.Unauthorized:
        Modal.error({
          title: '401 Unauthorized',
          onOk: () => {
            window.location.href = '/auth/login'
            localStorage.clear()
          }
        })
        break
      case HttpStatusCode.Forbidden:
        Modal.error({
          title: '403 Forbidden'
        })
        break
      case HttpStatusCode.BadRequest:
        Modal.error({
          title: '400 Bad Request'
        })
        break
      default:
        Modal.error({
          title: 'Action failed'
        })
    }
    return Promise.reject(error)
  }
)

const downloadHandler = axios.create(config)
// Request interceptor
downloadHandler.interceptors.request.use(
  (request: InternalAxiosRequestConfig) => {
    return request
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

export { downloadHandler }
export default fetchHandler
