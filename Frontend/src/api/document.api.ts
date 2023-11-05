import { downloadHandler } from './axios'
import { RcFile } from 'antd/es/upload'

export const UPLOAD_DOCUMENT = 'document/adddocument'
export const GET_BY_ID = 'document/getdocumentbyid'
export const DOWNLOAD_DOCUMENT = 'document/download'

const documentAPI = {
  upload: (body: UploadDocumentRequest) => {
    return downloadHandler.post<UploadDocumentResponse>(UPLOAD_DOCUMENT, body)
  }
}

export default documentAPI

export type UploadDocumentRequest = {
  folderPath: 'create/project' | 'create/task'
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
