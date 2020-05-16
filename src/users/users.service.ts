import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { MongoRepository } from 'typeorm';
import * as mongodb from 'mongodb';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: MongoRepository<User>
  ) { }


  public async create(user: User): Promise<void> {
    try {
      await this.usersRepository.save(user);
    } catch (e) {
      throw new HttpException(e.message, e.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getAll(): Promise<User[]> {
    try {
      return await this.usersRepository.find();
    } catch (e) {
      throw new HttpException(e.message, e.status || HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  public async getById(userId: string): Promise<User> {
    try {
      if (!mongodb.ObjectID.isValid(userId)) {
        throw new BadRequestException('Invalid ID Param');
      }

      const user = await this.usersRepository.findOne(userId);

      if (!user) {
        throw new NotFoundException('User not Found');
      }

      return user;
    } catch (e) {
      throw new HttpException(e.message, e.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getByEmail(email: string): Promise<User> {
    try {
      const user = await this.usersRepository.findOne({email});
      return user;
    } catch (e) {
      throw new HttpException(e.message, e.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


}
