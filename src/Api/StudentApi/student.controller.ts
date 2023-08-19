import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { StudentService } from "./student.service";
import { CreateStudentDto, UpdateStudentDto } from "./Dto/student.dto";

@ApiTags("Student")
@Controller("student")
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get("getall")
  GetAllProject(){
    return this.studentService.findAll();
  }

  @Get("/:id")
  GetProjectById(@Param('id') id: string){
    return this.studentService.findOne(id)
  }

  @ApiBody({type: CreateStudentDto})
  @Post("createstudent")
  CreateStudent(@Body() newStudent: CreateStudentDto){
    return this.studentService.add(newStudent);
  }

  @ApiBody({type: UpdateStudentDto})
  @Post("updatestudent")
  async UpdateStudent(@Body() updateStudent: UpdateStudentDto){
    var res = await this.studentService.updateStudent(updateStudent.id, updateStudent);
    return res;
  }
}