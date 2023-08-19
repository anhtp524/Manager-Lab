import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ProjectService } from "./project.service";
import { CreateProject } from "./Dto/project.dto";

@ApiTags("Project")
@Controller("project")
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get("getall")
  GetAllProject(){
    return this.projectService.findAll();
  }

  @Get("/:id")
  GetProjectById(@Param('id') id: string){
    return this.projectService.findOne(id)
  }

  @ApiBody({type: CreateProject})
  @Post("addproject")
  async AddProject(@Body() newProject: CreateProject){
    const result = await this.projectService.add(newProject);
    return result;
  }

}