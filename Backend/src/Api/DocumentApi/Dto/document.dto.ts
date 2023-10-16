export class CreateDocumentDto {
    documentName : string;
    documentType : string;
    documentContent : Buffer;
    size : number;
    mimeType : string;
}