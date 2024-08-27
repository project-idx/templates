import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function query() {
  const videos = await prisma.video.findMany({
    where: {
      channel: { title: 'Firebase' },
      viewCount: { gt: 10000 }, 
    },
    select: {
      title: true,
      viewCount: true,
    },
    take: 100, 
  });
  console.table(videos);
}

query()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

