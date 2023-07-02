import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ProjectService } from "./project.service";

@ApiTags("Project")
@Controller("project")
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

//   @ApiBody({type: CreateUser})
//   @Post("adduser")
//   CreateUsers(@Body() newUser: CreateUser) {
//     return this.userService.add(newUser);
//   }

//   @Get("getall")
//   GetAllUser(){
//     return this.userService.findAll();
//   }
}