import { Injectable, UnauthorizedException } from '@nestjs/common'
import { sign } from 'jsonwebtoken'
import { UnauthorizedError } from '../common/errors/types/UnauthorizedError'
import { UserEntity } from '../users/entities/user.entity'
import { UsersRepository } from '../users/repositories/users.repository'
import { Request } from 'express'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository
  ) {}


  public async createAccessToken(userId: number): Promise<string> {
    return sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION
    })
  }

  public async validateUser(userId: number): Promise<UserEntity> {
    const user = await this.usersRepository.findOne(userId)
    
    if (!user) {
      throw new UnauthorizedError('User not found.')
    } 

    return user
  }

  private static jwtExtractor(request: Request): string {
    const authHeader = request.headers.authorization

    if (!authHeader) {
      throw new UnauthorizedException('Not found or invalid token')
    }

    const [, token] = authHeader.split(' ')
    
    return token
  }

  public returnJwtExtractor(): (request: Request) => string {
    return AuthService.jwtExtractor
  }
}
