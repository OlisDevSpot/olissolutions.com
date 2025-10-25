// import { makeQueryClient } from '@olis/data-client/get-query-client'
// // import { createTRPCClient, httpLink } from '@trpc/client'
// import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query'
// import { cache } from 'react'
// import { createContext } from './lib/create-context'
// import { appRouter } from './routers/_app'
// import 'server-only' // <-- ensure this file cannot be imported from the client
// // IMPORTANT: Create a stable getter for the query client that
// //            will return the same client during the same request.
// export const getQueryClient = cache(makeQueryClient)
// export const trpc = createTRPCOptionsProxy({
//   ctx:
//   router: appRouter,
//   queryClient: getQueryClient,
// })
// // If your router is on a separate server, pass a client:
// // createTRPCOptionsProxy({
// //   client: createTRPCClient({
// //     links: [httpLink({ url: '...' })],
// //   }),
// //   queryClient: getQueryClient,
// // })
