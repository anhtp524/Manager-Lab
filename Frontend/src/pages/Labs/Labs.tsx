import LabsChildren from './LabsChildren'
import './labs.scss'

const Labs = () => {
  return (
    <div className='labsParent'>
      <span>Danh sách các phòng Labs hiện có : </span>
      <div className='labscontent'>
        <div className='labscontentChild'>
          <LabsChildren />
        </div>
        <div className='labscontentChild'>
          <LabsChildren />
        </div>{' '}
        <div className='labscontentChild'>
          <LabsChildren />
        </div>
        <div className='labscontentChild'>
          <LabsChildren />
        </div>
        <div className='labscontentChild'>
          <LabsChildren />
        </div>{' '}
        <div className='labscontentChild'>
          <LabsChildren />
        </div>{' '}
      </div>
    </div>
  )
}

export default Labs
