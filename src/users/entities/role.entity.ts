import { Role } from '@prisma/client';

export class RoleEntity implements Role {
  id: number;
  name: string;
  slug: string;
  default: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
