import { Tabs } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'
import TableStudentProject from './TableStudentProject'
import TableTeacherProject from './TableTeacherProject'
import { dataProject } from '../ultis'
import { convertStatusEnumToValue } from '~/pages/Labs/components/Projects'

function ProjectChildren() {
  return (
    <div className='project-children'>
      <div className='project-children-content-top'>
        <div className='title'>Project ABC</div>
        <div className='status'>{convertStatusEnumToValue(dataProject.status)}</div>
      </div>
      <div className='tab-lab-details'>
        <Tabs defaultActiveKey='1'>
          <TabPane tab={<span>Student</span>} key='1'>
            <TableStudentProject />
          </TabPane>
          <TabPane tab={<span>Teacher</span>} key='2'>
            <TableTeacherProject />
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default ProjectChildren
