import { Controller, Get, Param } from '@nestjs/common';
import { ParamsDictionary } from 'express-serve-static-core';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService
  ) {}

  @Get()
  public async getAll(): Promise<User[]> {
    return await this.usersService.getAll();
  }

  @Get(':id')
  public async getById(
    @Param() params: ParamsDictionary
  ): Promise<User> {
    return await this.usersService.getById(params.id);
  }



}
