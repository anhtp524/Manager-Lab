import { Spin } from 'antd'
import { useEffect, useState } from 'react'
import { dataLab } from '~/mockdata/model'
import LabsChildren from './LabsChildren'
import './labs.scss'

const Labs = () => {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)
    return () => {
      clearTimeout(timer)
    }
  }, [])
  return (
    <div className='labsParent'>
      {isLoading ? (
        <Spin />
      ) : (
        <div className='labscontent'>
          {dataLab.map((data) => (
            <div className='labscontentChild'>
              <LabsChildren title={data.title} img={data.img} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Labs
