// import { PrismaClient } from './src/generated/prisma'
import 'dotenv/config'
import prisma from './src/utils/prisma'
// import prisma from "@/utils/prisma"

// const prisma = new PrismaClient()

// async function main() {
// 	const requests = await prisma.request.findMany()
// 	console.log(requests)
// }

// main()
// 	.catch(console.error)
// 	.finally(() => prisma.$disconnect())

// test-prisma.ts

async function main() {
    const requests = await prisma.request.findMany()
    console.log(requests)
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
