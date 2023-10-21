import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TopicEntity } from "src/entity/topic.entity";
import { Repository } from "typeorm";
import { CreateTopicDto } from "./Dto/createTopic.dto";
import { LaboratoryEntity } from "src/entity/laboratory.entity";
import { UserEntity } from "src/entity/user.entity";
import { DocumentService } from "../DocumentApi/document.service";

@Injectable()
export class TopicService {
    constructor(
        @InjectRepository(TopicEntity)
        private topicRepo: Repository<TopicEntity>,
        private documentService: DocumentService
    ){}

    async getListTopicInLab(labId: string) {
        const listTopic = await this.topicRepo.find({
            relations: {
                lab: true,
                owner: true
            },
            where: {
                lab: {
                    id: labId
                }
            },
            order : {
                createdDate: "DESC"
            }
        });

        return listTopic;
    }

    async addTopicIntoLab(createTopicDto: CreateTopicDto, labId: string, userId: string){
        var topicModel = await this.topicRepo.create({content: createTopicDto.content})
        topicModel.createdDate = new Date();
        topicModel.lab = new LaboratoryEntity();
        topicModel.lab.id = labId;
        topicModel.owner = new UserEntity();
        topicModel.owner.id = userId;
        const result = await this.topicRepo.save(topicModel);
        return result;
    }

    async getTopicById(topicId: string) {
        var topicModel = await this.topicRepo.findOne({
            where : {
                id: topicId
            }
        });

        return topicModel;
    }
}