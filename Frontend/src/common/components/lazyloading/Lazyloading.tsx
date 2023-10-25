import { Spin } from 'antd'
import './lazyloading.scss'

const Lazyloading = () => {
  return (
    <div className='loadingWapper' data-auto-id='LazyLoading'>
      <Spin size='large'></Spin>
      <strong>Please wait...</strong>
    </div>
  )
}

export default Lazyloading
