import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { s3Client } from '@olis/services/s3'
import { createTRPCRouter, protectedProcedure } from '@olis/trpc/init'
import { nanoid } from 'nanoid'
import z from 'zod'

export const coreRouter = createTRPCRouter({
  generatePresignedUrl: protectedProcedure
    .input(z.object({ fileName: z.string(), contentType: z.string(), size: z.number() }))
    .mutation(async ({ input }) => {
      const key = `${nanoid()}-${input.fileName}`

      const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        ContentType: input.contentType,
        ContentLength: input.size,
      })
      const url = await getSignedUrl(s3Client, command, {
        expiresIn: 360, // 6 minutes
      })

      return { url, key }
    }),
})
