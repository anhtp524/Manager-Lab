import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { TopicService } from "./topic.service";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { UsersService } from "../UserApi/users.service";
import { CreateTopicDto } from "./Dto/createTopic.dto";

@Controller()
@ApiTags("Topic")
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class TopicController {
    constructor(
        private topicService: TopicService,
        private userService: UsersService
    ){}

    @Get("getalltopic")
    async GetAllTopicInLab(@Req() req) {
        const {userId, role} = req.user;
        var labId = await this.userService.getLabIdByUserId(userId, role);
        if(labId == null) return [];
        const res = await this.topicService.getListTopicInLab(labId);
        return res;
    }

    @Get("gettopicdetail/:id")
    async GetTopicById(@Param('id') id: string) {
        const res = await this.topicService.getTopicById(id);
        return res;
    }

    @Post("createtopic")
    @ApiBody({type: CreateTopicDto})
    async CreateTopic(@Body() newTopic: CreateTopicDto, @Req() req) {
        const {userId, role} = req.user;
        var labId = await this.userService.getLabIdByUserId(userId, role);
        if(labId == null) return 0;
        const res = await this.topicService.addTopicIntoLab(newTopic, labId, userId);
        return res;
    }
}