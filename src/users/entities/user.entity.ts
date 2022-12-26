import { User } from '@prisma/client';

export class UserEntity implements User {
  id: number;
  email: string;
  name: string;
  password: string;
  roleId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  constructor(user ?: Partial<UserEntity>) {
    this.id = user?.id
    this.email = user?.email
    this.name = user?.name
    this.password = user?.password
    this.roleId = user?.roleId
    this.createdAt = user?.createdAt
    this.updatedAt = user?.updatedAt
    this.deletedAt = user?.deletedAt
  }
}
