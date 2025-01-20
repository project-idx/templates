import { PrismaClient } from '@prisma/client'
import * as fs from 'node:fs'

const prisma = new PrismaClient()

async function main() {
  const channelsToInsert = [
    { id: 'UCP4bf6IHJJQehibu6ai__cg', title: 'Firebase' },
    { id: 'UCnUYZLuoy1rq1aVMwx4aTzw', title: 'Chrome' },
    { id: 'UCwXdFgeE9KYzlDdR7TG9cMw', title: 'Flutter' },
    { id: 'UCVHFbqXqoYvEWM1Ddxl0QDg', title: 'Android' },
    { id: 'UC_x5XG1OV2P6uZZ5FSM9Ttw', title: 'Google for Developers' },
    { id: 'UC0rqucBdTuFTjJiefW5t-IQ', title: 'Tensorflow' },
    { id: 'UCbn1OgGei-DV7aSRo_HaAiw', title: 'Angular' },
    { id: 'UCO3LEtymiLrgvpb59cNsb8A', title: 'Go' },
  ];

  try {
    // Read videos.json file
    const rawVideoData = fs.readFileSync('./videos.json', 'utf-8');
    const videos = JSON.parse(rawVideoData);

    // Add channels and videos in a single transaction
    await prisma.$transaction(async (tx) => {
      // Insert or update channels
      for (const channel of channelsToInsert) {
        await tx.channel.upsert({
          where: { id: channel.id },
          update: {},
          create: {
            id: channel.id,
            title: channel.title,
          },
        });
        console.log(`Inserted/Updated channel: ${channel.title}`);
      }

      // Insert videos
      for (const video of videos) {
        // Check if any statistics are missing
        if (!video.statistics || !video.statistics.viewCount || !video.statistics.likeCount) {
          console.log(`Skipping video with missing statistics: ${video.title}`);
          continue; // Skip to the next video
        }
      
        await tx.video.create({
          data: {
            id: video.resourceId.videoId,
            title: video.title,
            publishedAt: video.publishedAt,
            viewCount: parseInt(video.statistics.viewCount),
            likeCount: parseInt(video.statistics.likeCount),
            thumbnailHighres: video.thumbnails.maxres?.url || video.thumbnails.standard?.url || video.thumbnails.high?.url || null, 
            channel: {
              connect: { id: video.channelId },
            },
          },
        });
        console.log(`Inserted video: ${video.title}`);
      }
    });

    console.log('Channels and videos inserted successfully!');
  } catch (error) {
    console.error('Error inserting channels and videos:', error);
  }
}

async function deleteAll() {
  await prisma.$transaction(async (tx) => {
    await tx.channel.deleteMany();
    await tx.video.deleteMany();
    console.log('Channel and Video are deleted');
  });
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
  