import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common'
import { Prisma, PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect()

    this.$use(async (params, next) => {
      if (params.action == 'delete') {
        params.action = 'update'
        params.args['data'] = { deletedAt: new Date() }
      }

      if (params.action == 'deleteMany') {
        params.action = 'updateMany'
        if (params.args.data != undefined) {
          params.args.data['deletedAt'] = new Date()
        } else {
          params.args['data'] = { deletedAt: new Date() }
        }
      }

      if (params.action === 'findUnique' || params.action === 'findFirst') {
        params.action = 'findFirst'
        params.args.where['deletedAt'] = null
      }

      if (params.action === 'findMany') {
        console.log(params)
        if (params.args && params.args.where != undefined) {
          if (params.args.where.deletedAt == undefined) {
            params.args.where['deletedAt'] = null
          }
        } else {
          params.args = {
            where: {
              deletedAt: null,
            },
          }
        }
      }

      return next(params)
    })

    this.$use(async (params, next) => {
      console.log(params.action)
      if (params.action != 'create' || params.model != 'User') {
        return next(params)
      }

      params.args.data['password'] = await this.encryptPassword(params.args.data['password'])
      return next(params)
    })
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close()
    })
  }

  private async encryptPassword(password: String): Promise<String> {
    return bcrypt.hash(password, 10)
  }
}
