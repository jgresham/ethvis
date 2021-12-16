import { createApi, fetchBaseQuery, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import Constants from '../Constants.json'
import { executionWS } from '../App'
// Define a service using a base URL and expected endpoints
export const RtkqConsensusApi = createApi({
  reducerPath: 'RtkqConsensusApi',
  baseQuery: fetchBaseQuery({ baseUrl: Constants.default_consensus_client_http_endpoint }),
  endpoints: (builder) => ({
    getBlock: builder.query<any, string>({
      query: (blockId) => `/eth/v1/beacon/blocks/${blockId}`,
      transformResponse: (response: { data: any }) => response.data.message,
    }),
    getIsSyncing: builder.query<any, null>({
      query: () => `/eth/v1/node/syncing`,
      transformResponse: (response: { data: any }) => response.data,
    }),
    getNetworkInfo: builder.query<any, null>({
      query: () => `/eth/v1/node/peers`,
      transformResponse: (response: { data: any }) => response.data,
    }),
  }),
})

type CustomerErrorType = {
  message: 'custom api failed'
}

export const RtkqExecutionWs = createApi({
  reducerPath: 'RtkqExecutionWs',
  baseQuery: fakeBaseQuery<CustomerErrorType>(),
  endpoints: (builder) => ({
    getExecutionChainId: builder.query<any, null>({
      queryFn: async () => {
        return { data: await executionWS.getChainId() }
      },
    }),
    getExecutionBlock: builder.query<any, string>({
      queryFn: async (blockId) => {
        const block = await executionWS.getLatestBlock()
        return { data: block }
      },
    }),
    getExecutionIsSyncing: builder.query<any, null>({
      queryFn: async () => {
        return { data: await executionWS.isSyncing() }
      },
    }),
    getExecutionNetworkInfo: builder.query<any, null>({
      queryFn: async () => {
        return { data: await executionWS.getNetworkInfo() }
      },
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetBlockQuery, useGetIsSyncingQuery, useGetNetworkInfoQuery } = RtkqConsensusApi
export const {
  useGetExecutionBlockQuery,
  useGetExecutionIsSyncingQuery,
  useGetExecutionNetworkInfoQuery,
  useGetExecutionChainIdQuery,
} = RtkqExecutionWs
