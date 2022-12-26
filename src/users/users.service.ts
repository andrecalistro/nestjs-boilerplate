import { AuthService } from './../auth/auth.service';
import { Injectable } from '@nestjs/common';
import { NotFoundError } from '../common/errors/types/NotFoundError';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SigninDto } from './dto/signin.dto'
import { ListUserDto } from './dto/list-user.dto'
import { UserEntity } from './entities/user.entity';
import { UsersRepository } from './repositories/users.repository';
import * as bcrypt from 'bcrypt'
import { UnauthorizedError } from '../common/errors/types/UnauthorizedError';
import { RolesRepository } from './repositories/roles.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly repository: UsersRepository,
    private readonly rolesRepository: RolesRepository,
    private readonly authService: AuthService,
  ) {}

  public async create(createUserDto: CreateUserDto) {
    return this.repository.create(createUserDto)
  }

  public async findAll(): Promise<ListUserDto[]> {
    const users = await this.repository.findAll()
    
    return users.map(function(user) {
      const userDto = new ListUserDto()
      userDto.name = user.name
      userDto.email = user.email
      userDto.createdAt = user.createdAt

      return userDto
    })
  }

  public async findOne(id: number): Promise<UserEntity> {
    const user = await this.repository.findOne(id)

    if (!user) {
      throw new NotFoundError('User not found.')
    }

    return user;
  }


  public async update(id: number, updateUserDto: UpdateUserDto) {
    return this.repository.update(id, updateUserDto)
  }

  public async remove(id: number) {
    return this.repository.remove(id)
  }

  public async signup(createUserDto: CreateUserDto): Promise<UserEntity> {
    const role = await this.rolesRepository.findDefault()
    createUserDto.roleId = role.id

    return this.repository.create(createUserDto)
  }

  public async signin(
    signinDto: SigninDto
  ): Promise<{ name: string; jwtToken: string; email: string; }> {
    const user = await this.findByEmail(signinDto.email)
    await this.checkPassword(signinDto.password, user)
    const jwtToken = await this.authService.createAccessToken(user.id)

    return {
      name: user.name,
      email: user.email,
      jwtToken,
    }
  }

  private async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.repository.findOneBy('email', email);

    if (!user) {
      throw new NotFoundError('User not found.')
    }

    return user
  }

  private async checkPassword(password: string, user: UserEntity): Promise<boolean> {
     const match = await bcrypt.compare(password, user.password)

     if (!match) {
      throw new UnauthorizedError('Email or password are incorrect.')
     }

     return match
  }
}
