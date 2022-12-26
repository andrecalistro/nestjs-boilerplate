import { AuthService } from './../auth/auth.service';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersRepository } from './repositories/users.repository';
import { HttpModule } from '@nestjs/axios';
import { RolesRepository } from './repositories/roles.repository';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService, PrismaService, UsersRepository, AuthService, RolesRepository
  ],
  imports: [
    HttpModule
  ]
})
export class UsersModule {}
