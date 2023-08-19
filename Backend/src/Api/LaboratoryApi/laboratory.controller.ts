import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { LabboratoryService } from "./laboratory.service";
import { CreateLaboratoryDto } from "./Dto/laboratory.dto";

@ApiTags("Lab")
@Controller("lab")
export class LaboratoryController {
  constructor(private readonly labService: LabboratoryService) {}

  @ApiBody({type: CreateLaboratoryDto})
  @Post("createLab")
  CreateLab(@Body() newUser: CreateLaboratoryDto) {
    return this.labService.add(newUser);
  }

  @Get("getall")
  GetAllLab(){
    return this.labService.findAll();
  }

  @Get("/:id")
  GetLabById(@Param('id') id: string){
    return this.labService.findOne(id);
  }
}