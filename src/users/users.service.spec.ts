import { SigninDto } from './dto/signin.dto';
import { CreatedUserDto } from './dto/created-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ListUserDto } from './dto/list-user.dto';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './../auth/auth.service';
import { RolesRepository } from './repositories/roles.repository';
import { UsersRepository } from './repositories/users.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';

const userEntity = new UserEntity({
  email: 'test@test.com',
  name: 'Test',
  password: "123456",
  roleId: 1,
})

const expectedListUsers = [
  new ListUserDto({
    email: 'test@test.com',
    name: 'Test',
    createdAt: new Date()
  })
]

const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

const signExpected = {
  name: "Test",
  email: "test@test.com",
  jwtToken: jwtToken,
}

const role = {
  id: 1,
  name: "administrator",
}

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: {
            findAll: jest.fn().mockResolvedValue(expectedListUsers),
            create: jest.fn().mockResolvedValue(userEntity),
            findOne: jest.fn().mockResolvedValue(userEntity),
            update: jest.fn().mockResolvedValue(userEntity),
            remove: jest.fn().mockResolvedValue(userEntity),
            findOneBy: jest.fn().mockResolvedValue(userEntity),
            sign: jest.fn().mockResolvedValue(signExpected),
          }
        },
        {
          provide: RolesRepository,
          useValue: {
            findDefault: jest.fn().mockResolvedValue(role)
          }
        },
        {
          provide: AuthService,
          useValue: {
            createAccessToken: jest.fn().mockResolvedValue(jwtToken)
          }
        }
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('create successfully', async () => {
      const createUserDto = new CreateUserDto()
      createUserDto.email = 'test@test.com'
      createUserDto.name = 'Test'
      createUserDto.password = '123456'
      createUserDto.roleId = 1

      const expectedUser = {
        email: 'test@test.com',
        name: 'Test',
        password: '123456',
        roleId: 1,
      }

      const user = await service.create(createUserDto)

      expect(user.name).toEqual(expectedUser.name)
      expect(user.email).toEqual(expectedUser.email)
      expect(user.password).toEqual(expectedUser.password)
      expect(user.roleId).toEqual(expectedUser.roleId)
    })
  })

  describe('findAll', () => {
    it('findAll successfully', async () => {
      const users = await service.findAll()

      expect(users).toEqual(expectedListUsers)
    })
  })

  describe('findOne', () => {
    it('findOne successfully', async () => {
      const id = 1
      const user = await service.findOne(id)

      expect(user).toEqual(userEntity)
    })
  })

  describe('update', () => {
    it('update successfully', async () => {
      const updateUserDto = new CreateUserDto()
      updateUserDto.email = 'test@test.com'
      updateUserDto.name = 'Test'
      updateUserDto.password = '123456'
      updateUserDto.roleId = 1

      const id = 1
      const user = await service.update(id, updateUserDto)

      expect(user).toEqual(userEntity)
    })
  })

  describe('remove', () => {
    it('remove successfully', async () => {
      const id = 1
      const user = await service.remove(id)

      expect(user).toEqual(userEntity)
    })
  })

  describe('signup', () => {
    it('signup successfully', async () => {
      const createUserDto = new CreateUserDto()
      createUserDto.email = 'test@test.com'
      createUserDto.name = 'Test'
      createUserDto.password = '123456'

      const user = await service.signup(createUserDto)

      expect(user).toEqual(userEntity)
    })
  })

  describe('signin', () => {
    it('signin successfully', async () => {
      const signInDto = new SigninDto()
      signInDto.email = "test@test.com"
      signInDto.password = "123456"

      const bcryptCompare = jest.fn().mockResolvedValue(true);
      (bcrypt.compare as jest.Mock) = bcryptCompare;

      const sign = await service.signin(signInDto)

      expect(sign).toEqual(signExpected)
    })
  })
});
