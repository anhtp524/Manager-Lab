export class TeacherInProject {
    id: string;
    name: string;
    email: string;
}

export class StudentInProject {
    id: string
    name: string;
    msv: number;
    class: string;
}

export class DetailProjectModel {
    id: string;
    name: string;
    coreTech: string;
    description: string;
    students: StudentInProject[];
    teachers: TeacherInProject[];
}



