import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ListUserDto } from './dto/list-user.dto';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import exp from 'constants';

const expectUsers = [
  new ListUserDto({
    email: 'test@test.com',
    name: "Test",
    createdAt: new Date(),
  })
]

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(expectUsers)
          }
        },
        { 
          provide: HttpService,
          useValue: {
            axiosRef: jest.fn()
          }
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('findAll successfully', async () => {
      const users = await controller.findAll()

      expect(users).toEqual(expectUsers)
    });
  })

  describe('download', () => {
    it('download successfully', async () => {
      const downloadMessage = await controller.download()

      expect(typeof downloadMessage).toBe('string')
    });
  })
});
