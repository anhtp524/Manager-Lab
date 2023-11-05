import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { LabboratoryService } from "./laboratory.service";
import { CreateLaboratoryDto } from "./Dto/laboratory.dto";
import { AuthGuard } from "@nestjs/passport";
import { UsersService } from "../UserApi/users.service";

@ApiTags("Lab")
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller("lab")
export class LaboratoryController {
  constructor(
    private readonly labService: LabboratoryService,
    private readonly userService: UsersService
    ) {}

  @ApiBody({type: CreateLaboratoryDto})
  @Post("createLab")
  CreateLab(@Body() newUser: CreateLaboratoryDto) {
    return this.labService.add(newUser);
  }

  @Get("getall")
  GetAllLab(){
    return this.labService.findAll();
  }

  @Get("getdetaillab/:id")
  async GetDetailLab(@Param("id") id: string, @Req() req) {
    const user = req.user;
    const userProfile = await this.userService.getProfileUser(user.userId, user.role);
    const result = await this.labService.getDetailLab(id, userProfile.id);
    return result;
  }
}