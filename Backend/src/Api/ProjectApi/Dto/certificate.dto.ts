export class InfoStudent {
    studentName: string;
    class: string;
    studentCode: number;
    dateOfBirth: string;
}

export class InfoProject {
    projectName: string;
    score: number;
    finishDate: Date
}

export class CertificateDto {
    student: InfoStudent;
    project: InfoProject;
    labName: string;
}