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
  await prisma.department
    .create({
      data: {
        name: 'Madrasah Aliyah',
      },
    })
    .then(async (department) => {
      await prisma.batch
        .create({
          data: {
            name: 'Ilmu Pengetahuan Alam',
            departmentId: department.id,
            alias: 'IPA',
          },
        })
        .then(async (batch) => {
          await prisma.group
            .create({
              data: {
                name: 'A',
                batchId: batch.id,
              },
            })
            .then(async (group) => {
              await prisma.student.create({
                data: {
                  fullName: 'Hamdani Lombok',
                  email: 'hamdani@gmail.com',
                  phone: '08123456789',
                  groupId: group.id,
                  password: hashSync('danis3m3t', 10),
                  role: 'STUDENT',
                },
              })
            })
        })
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
