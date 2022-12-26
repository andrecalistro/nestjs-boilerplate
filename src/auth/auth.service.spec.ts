import { UserEntity } from '../users/entities/user.entity';
import { sign } from 'jsonwebtoken';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepository } from '../users/repositories/users.repository';
import { AuthService } from './auth.service';

const userEntity = new UserEntity({
  email: 'test@test.com',
  name: 'Test',
  password: "123456",
  roleId: 1,
})

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersRepository,
          useValue: {
            findOne: jest.fn().mockResolvedValue(userEntity),
          }
        }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createAccessToken', () => {
    it('createAccessToken successfully', async () => {
      const userId = 1

      const expectedToken = await sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION
      })

      const token = await service.createAccessToken(userId)

      expect(token).toEqual(expectedToken)
    })
  })

  describe('validateUser', () => {
    it('validateUser successfully', async () => {
      const userId = 1
      const user = await service.validateUser(userId)

      expect(user).toEqual(userEntity)
    })
  })
});
