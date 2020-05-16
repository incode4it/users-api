import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupUserDto } from './dto/signup-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService
  ) {}

  @Post('/sign-up')
  public async signupUser(
    @Body() signupUserDto: SignupUserDto
  ): Promise<void> {
    await this.authService.signupUser(signupUserDto);
  }

  @Post('/login')
  public async loginUser(
    @Body() loginUserDto: LoginUserDto
  ) {
    return '';
  }


}
