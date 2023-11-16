import { ProjectStatus } from 'Core/Enum/ProjectEnum';

export class TeacherInProject {
  id: string;
  name: string;
  email: string;
}

export class StudentInProject {
  id: string;
  name: string;
  msv: number;
  class: string;
}

export class DetailProjectModel {
  id: string;
  name: string;
  coreTech: string;
  status: ProjectStatus;
  description: string;
  score: number;
  feedback: string;
  students: StudentInProject[];
  teachers: TeacherInProject[];
}
