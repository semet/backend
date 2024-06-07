import { PrismaClient } from '@prisma/client'
import { hashSync } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  await prisma.admin.create({
    data: {
      email: 'hamdanilombok@gmail.com',
      phone: '08123456789',
      password: hashSync('danis3m3t', 10),
      fullName: 'Hamdani Lombok',
      role: 'ADMIN',
    },
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    // eslint-disable-next-line no-console
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
