import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { convertStatusEnumToValue } from '../Labs/components/Projects'
import { IProjectTable, dataTableProject } from './ultis'
import './Project.scss'

function Project() {
  const navigate = useNavigate()
  const columnProjectList: ColumnsType<IProjectTable> = useMemo(
    () => [
      {
        title: 'Name',
        dataIndex: 'name',
        render: (text) => {
          return (
            <span
              onClick={() => {
                navigate('/project/details/111')
              }}
              className='column-name-project'
            >
              {text}
            </span>
          )
        }
      },
      {
        title: 'Date',
        dataIndex: 'date'
      },
      {
        title: 'Description',
        dataIndex: 'description'
      },
      {
        title: 'Status',
        dataIndex: 'status',
        render: (status) => {
          return convertStatusEnumToValue(status)
        }
      }
    ],
    [navigate]
  )

  const onRenderContent = useCallback(() => {
    return (
      <div className='project'>
        <div className='title-header-project'>
          <span>Project</span>
        </div>
        <div className='table-project'>
          <Table columns={columnProjectList} dataSource={dataTableProject} bordered />
        </div>
      </div>
    )
  }, [columnProjectList])

  return <>{onRenderContent()}</>
}

export default Project
