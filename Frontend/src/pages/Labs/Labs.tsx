import LabsChildren from './LabsChildren'
import './labs.scss'
import { useEffect, useState } from 'react'
import { useHandlingApi } from '~/common/context/useHandlingApi'
import labAPI, { ListLab } from '~/api/lab.api'

const Labs = () => {
  const [listLab, setListLab] = useState<ListLab>([])
  const { showLoading, closeLoading } = useHandlingApi()
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    const handleGetAllLab = async () => {
      showLoading()
      try {
        const response = await labAPI.getAll({ signal: signal })
        if (response && response.data) {
          setListLab(response.data)
        }
      } catch (error: Dennis) {
        console.error(error)
      } finally {
        closeLoading()
      }
    }

    handleGetAllLab()

    return () => {
      abortController.abort()
    }
  }, [])

  return (
    <div className='labsParent'>
      <div className='labscontent'>
        {listLab &&
          listLab.length > 0 &&
          listLab.map((item, _) => (
            <div className='labscontentChild' key={item.id}>
              <LabsChildren data={item} />
            </div>
          ))}
      </div>
    </div>
  )
}

export default Labs
