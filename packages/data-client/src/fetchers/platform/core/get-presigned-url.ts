import type { trpc } from '@olis/data-client/trpc/server'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { inferInput, inferOutput } from '@trpc/tanstack-react-query'
import { useTRPC } from '@olis/data-client/trpc/client'
import { useMutation } from '@tanstack/react-query'

type GetPresignedUrlOutput = inferOutput<typeof trpc.platform.core.generatePresignedUrl>
type GetPresignedUrlInput = inferInput<typeof trpc.platform.core.generatePresignedUrl>

export function useGetPresignedUrl(opts?: UseMutationOptions<GetPresignedUrlOutput, unknown, GetPresignedUrlInput>) {
  const trpc = useTRPC()
  return useMutation(trpc.platform.core.generatePresignedUrl.mutationOptions(opts))
}
