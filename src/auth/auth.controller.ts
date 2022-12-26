import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CreatedUserDto } from '../users/dto/created-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../users/entities/user.entity';
import { SigninDto } from '../users/dto/signin.dto';

@ApiTags('Auth')
@Controller('api/v1/')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  public async singup(@Body() signupDto: CreateUserDto): Promise<CreatedUserDto> {
    const { name, email } = await this.usersService.signup(signupDto)
    const createdUserDto = new CreatedUserDto()
    createdUserDto.name = name
    createdUserDto.email = email

    return createdUserDto
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  public async signin(
    @Body() signinDto: SigninDto
  ): Promise<{ name: string; jwtToken: string; email: string; }> {
    return this.usersService.signin(signinDto)  
  }
}
