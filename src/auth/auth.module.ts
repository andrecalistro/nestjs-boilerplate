import { UsersService } from './../users/users.service';
import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { AuthService } from './auth.service'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { UsersRepository } from 'src/users/repositories/users.repository'
import { JwtStrategy } from './strategies/jwt.strategy'
import { AuthController } from './auth.controller'
import { RolesRepository } from 'src/users/repositories/roles.repository';

@Module({
  controllers: [AuthController],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRATION
      }
    }),
  ],
  providers: [AuthService, PrismaService, UsersRepository, JwtStrategy, UsersService, RolesRepository],
  exports: [AuthService]
})
export class AuthModule {}
