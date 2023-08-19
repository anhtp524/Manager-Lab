import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { CreateUser } from './Dto/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: string) {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: string) {
    await this.usersRepository.delete(id);
    return 1;
  }

  async add(newuser: CreateUser){
    const data = await this.usersRepository.create(newuser);
    await this.usersRepository.save(data);
    return 1;
  }
}