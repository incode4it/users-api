import { BadRequestException, Injectable } from '@nestjs/common';
import { SignupUserDto } from './dto/signup-user.dto';
import { UsersService } from '../users/users.service';
import { AccountType, User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService
  ) {}


  public async signupUser(signUserDTO: SignupUserDto): Promise<void> {
    if (await this.usersService.getByEmail(signUserDTO.email)) {
      throw new BadRequestException('Email already exists');
    }

    const user = new User({
      ...signUserDTO,
      password: await bcrypt.hash(signUserDTO.password, SALT_ROUNDS),
      accountType: AccountType.Default
    });
    await this.usersService.create(user);
  }

}

