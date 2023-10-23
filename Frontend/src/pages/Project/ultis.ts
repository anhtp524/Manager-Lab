import { ColumnsType } from 'antd/es/table'
import { convertStatusEnumToValue } from '../Labs/components/Projects'

export interface IProjectChildren {
  title: string
  image: string
}

export interface IStudent {
  id: string | number
  studentCode: string | number
  nameStudent: string
  class: string
}
export interface ITeacher {
  id: string | number
  nameTeacher: string
  major: string
}

export interface IFileData {
  id: string | number
  name: string
  fileType: string
}

export interface IDataProjectList {
  id: number | string
  nameProject: string
  coretech: string
  description: string
  status: number
  student: IStudent[]
  teacher: ITeacher[]
}

export interface IProjectTable {
  id: number | string
  name: string
  description: string
  status: number | string
  date: string
}

export const columnProjectList: ColumnsType<IProjectTable> = [
  {
    title: 'Name',
    dataIndex: 'name'
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
]

export const dataTableProject: IProjectTable[] = [
  {
    id: '1',
    name: 'Smart Home',
    description: 'This is a Nha Tu',
    status: 0,
    date: '23-10-2023'
  },
  {
    id: '2',
    name: 'Cosmic',
    description: 'This is a Nha Tu',
    status: 100,
    date: '23-10-2023'
  },
  {
    id: '3',
    name: 'Bala bala',
    description: 'This is a Nha Tu',
    status: 100,
    date: '23-10-2023'
  },
  {
    id: '4',
    name: 'Smart Home',
    description: 'This is a Nha Tu',
    status: 101,
    date: '23-10-2023'
  },
  {
    id: '5',
    name: 'Smart Home',
    description: 'This is a Nha Tu',
    status: 102,
    date: '23-10-2023'
  },
  {
    id: '6',
    name: 'Smart Home',
    description: 'This is a Nha Tu',
    status: 103,
    date: '23-10-2023'
  },
  {
    id: '7',
    name: 'Smart Home',
    description: 'This is a Nha Tu',
    status: 100,
    date: '23-10-2023'
  },
  {
    id: '8',
    name: 'Smart Home',
    description: 'This is a Nha Tu',
    status: 101,
    date: '23-10-2023'
  },
  {
    id: '9',
    name: 'Smart Home',
    description: 'This is a Nha Tu',
    status: 102,
    date: '23-10-2023'
  },
  {
    id: '10',
    name: 'Smart Home',
    description: 'This is a Nha Tu',
    status: 103,
    date: '23-10-2023'
  },
  {
    id: '11',
    name: 'Smart Home',
    description: 'This is a Nha Tu',
    status: 0,
    date: '23-10-2023'
  }
]

export const dataProject: IDataProjectList = {
  id: '1',
  nameProject: 'Cosmic',
  coretech: 'Ly Duc Chinh',
  description: 'This is a description',
  status: 100,
  student: [
    {
      id: '1',
      studentCode: '20192721',
      nameStudent: 'Chinh',
      class: 'ET1-09'
    }
  ],
  teacher: [
    {
      id: '1',
      nameTeacher: 'Kaylee Pham',
      major: 'Ke toan'
    }
  ]
}

export const dataFileList: IFileData[] = [
  {
    id: '1',
    name: 'File1',
    fileType: '.docx'
  }
]
