import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import config from './config'

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
