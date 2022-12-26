import { sign } from 'jsonwebtoken';
import { SigninDto } from './../users/dto/signin.dto';
import { CreatedUserDto } from './../users/dto/created-user.dto';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { UsersService } from './../users/users.service';
import { AuthController } from './auth.controller';
import { Test, TestingModule } from '@nestjs/testing';

const expectedUser = {
  email: 'test@test.com',
  name: 'Test',
}

const expectedUserSignin = async (process) => {
  const userId = 1
  const token = await sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION
  })

  return {
    email: "test@test.com",
    name: "Test",
    jwtToken: token
  }
}

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            signup: jest.fn().mockResolvedValue(expectedUser),
            signin: jest.fn().mockResolvedValue(expectedUserSignin),
          }
        }
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  })

  describe('singup', () => {
    it('singup successfully', async () => {
      const createUserDto = new CreateUserDto()
      createUserDto.email  = 'test@test.com'
      createUserDto.name  = 'Test'
      createUserDto.password  = "123456"
      createUserDto.roleId  = 1

      const createdUserDto = await authController.singup(createUserDto)
      
      expect(createdUserDto).toBeInstanceOf(CreatedUserDto)
      expect(createdUserDto.name).toEqual(expectedUser.name)
      expect(createdUserDto.email).toEqual(expectedUser.email)
    })
  })

  describe('singin', () => {
    it('singin successfully', async () => {
      const signinDto = new SigninDto()
      signinDto.email  = "test@test.com"
      signinDto.password  = "123456"

      const userSignin = await authController.signin(signinDto)
      
      expect(userSignin).toBeInstanceOf(Object)
      expect(userSignin.name).not.toBeNull()
      expect(userSignin.email).not.toBeNull()
      expect(userSignin.jwtToken).not.toBeNull()
    })
  })
})
