import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { TeacherService } from "./teacher.service";
import { AddTeacherLabDto, CreateTeacherDto, SearchTeacherDto } from "./Dto/teacher.dto";
import { AuthGuard } from "@nestjs/passport";

@ApiTags("Teacher")
@UseGuards(AuthGuard('jwt'))
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

  @ApiBody({type: SearchTeacherDto})
  @Post("getteacherinlabbyname")
  async GetTeacherInLabByName(@Body() searchNameDto: SearchTeacherDto){
    var res = await this.teacherService.getListTeacherByNameInLab(searchNameDto.searchName, searchNameDto.labId);
    return res;
  }

  
  @ApiBody({type : AddTeacherLabDto})
  @Post("addteachertolab")
  async AddTeacherToLab(@Body() addTeacherDto: AddTeacherLabDto) {
    var res = await this.teacherService.addTeacherToLab(addTeacherDto.teacherId, addTeacherDto.labId);
    return res;
  }

  @ApiBody({type : 'string'})
  @Post("deleteteacherinlab")
  async DeleteTeacherInLab(@Body() teacherId: string) {
    var res = await this.teacherService.deleteTeacherFromLab(teacherId);
    return res;
  }

  @Get("getteacherinlab/:labId")
  async GetTeacherInLab(@Param('labId') labId: string){
    var res = await this.teacherService.getTeacherInLab(labId);
    return res;
  }
}