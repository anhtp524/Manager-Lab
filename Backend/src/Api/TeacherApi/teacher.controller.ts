import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { TeacherService } from "./teacher.service";
import { CreateTeacherDto } from "./Dto/teacher.dto";

@ApiTags("Teacher")
@Controller("teacher")
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Get("getall")
  GetAllTeacher(){
    return this.teacherService.findAll();
  }

  @Get("/:id")
  GetTeacherById(@Param('id') id: string){
    return this.teacherService.findTeacherById(id)
  }

  @ApiBody({type: CreateTeacherDto})
  @Post("createteacher")
  CreateStudent(@Body() newStudent: CreateTeacherDto){
    return this.teacherService.add(newStudent);
  }
}