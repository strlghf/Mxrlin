import { prisma } from "./prisma";

// Here should go initial products
async function main () {
  await prisma.products.createMany({
    data: [
    ]
  })
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());