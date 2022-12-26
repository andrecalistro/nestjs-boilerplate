import { UnauthorizedError } from './../../common/errors/types/UnauthorizedError'
import { Injectable } from '@nestjs/common'
import { AuthService } from './../auth.service'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-jwt'
import { JwtPayload } from '../models/jwt-payload.model'
import { UserEntity } from 'src/users/entities/user.entity'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: authService.returnJwtExtractor(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    })
  }

  async validate(jwtPayload: JwtPayload): Promise<UserEntity> {
    const user = await this.authService.validateUser(jwtPayload.userId)

    if (!user) {
      throw new UnauthorizedError('User not authorized')
    }

    return user
  }
}