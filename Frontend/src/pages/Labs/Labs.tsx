import { dataLab } from '~/mockdata/model'
import LabsChildren from './LabsChildren'
import './labs.scss'

const Labs = () => {
  return (
    <div className='labsParent'>
      <div className='labscontent'>
        {dataLab.map((data) => (
          <div className='labscontentChild'>
            <LabsChildren title={data.title} img={data.img} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Labs
