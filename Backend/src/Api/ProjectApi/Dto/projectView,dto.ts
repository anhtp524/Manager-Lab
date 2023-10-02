export class TeacherInProject {
    name: string;
}

export class StudentInProject {
    name: string;
    msv: string;
    class: string;
}

export class DetailProjectModel {
    name: string;
    coreTech: string;
    description: string;
    students: StudentInProject[];
    teacher: TeacherInProject[];
}



