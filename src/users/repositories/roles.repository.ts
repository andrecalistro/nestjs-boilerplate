import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RoleEntity } from '../entities/role.entity';

@Injectable()
export class RolesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findDefault(): Promise<RoleEntity> {
    return this.prisma.role.findFirst({
      where: {
        default: true,
      },
    });
  }
}
