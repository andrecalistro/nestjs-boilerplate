import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()
async function main() {
  await prisma.role.createMany({
    data: [
      {
        name: "Administrator",
        slug: "administrator",
        default: false,
      },
      {
        name: "Customer",
        slug: "customer",
        default: true,
      }
    ]
  })

  await prisma.user.create({
    data: {
      name: "Administrator",
      email: "admin@admin.com",
      password: await bcrypt.hash("admin", 10),
      roleId: 1,
    },
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })