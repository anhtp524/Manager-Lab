import fetchHandler, { downloadHandler } from './axios'
import { RcFile } from 'antd/es/upload'

export const UPLOAD_DOCUMENT = 'document/adddocument'
export const GET_BY_ID = 'document/getdocumentbyid'
export const DOWNLOAD_DOCUMENT = 'document/download'
export const BY_REGARDING = 'document/byregarding'

const documentAPI = {
  upload: (body: UploadDocumentRequest) => {
    return downloadHandler.post<UploadDocumentResponse>(UPLOAD_DOCUMENT, body)
  },
  download: (id: GUID) => {
    return downloadHandler.get<Dennis>(DOWNLOAD_DOCUMENT + '/' + id)
  },
  byRegarding: (body: { regarding: GUID; folderPath: 'create/project' | 'create/task' | 'response/task' }) => {
    return fetchHandler.post<UploadDocumentResponse[]>(BY_REGARDING, body)
  }
}

export default documentAPI

export type UploadDocumentRequest = {
  folderPath: 'create/project' | 'create/task' | 'response/task'
  file: RcFile
}

export type UploadDocumentResponse = {
  documentName: string
  documentRuleId: GUID
  documentType: string
  id: GUID
  mimeType: string
  size: number
}
