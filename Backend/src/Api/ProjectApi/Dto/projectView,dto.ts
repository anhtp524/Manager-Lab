export class TeacherInProject {
    name: string;
}

export class StudentInProject {
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



