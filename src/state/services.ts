import {
  createApi,
  fetchBaseQuery,
  fakeBaseQuery,
  FetchArgs,
  BaseQueryFn,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import Constants from '../Constants.json'
import { consensusWS, executionWS } from '../App'
import { BlockHeader } from 'web3-eth'
import { BlockEvent } from '../ConsensusWS'
import { selectConsensusApiEndpoint } from './settings'
import { RootState } from './store'

const consensusApiFetchBaseQuery = fetchBaseQuery({
  baseUrl: Constants.default_consensus_client_http_endpoint,
})

const dynamicConsensusApiBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const consensusApiEndpoint = selectConsensusApiEndpoint(api.getState() as RootState)
  // gracefully handle scenarios where data to generate the URL is missing
  if (!consensusApiEndpoint) {
    return {
      error: {
        status: 400,
        statusText: 'Bad Request',
        data: 'No Consensus Api Endpoint set',
      },
    }
  }

  console.log('Calling consensus Api with base url: ', consensusApiEndpoint)
  const urlEnd = typeof args === 'string' ? args : args.url
  // // construct a dynamically generated portion of the url
  const adjustedUrl = consensusApiEndpoint + urlEnd
  const adjustedArgs = typeof args === 'string' ? adjustedUrl : { ...args, url: adjustedUrl }
  // // provide the amended url and other params to the raw base query
  return consensusApiFetchBaseQuery(adjustedArgs, api, extraOptions)
}

// Define a service using a base URL and expected endpoints
export const RtkqConsensusApi = createApi({
  reducerPath: 'RtkqConsensusApi',
  baseQuery: dynamicConsensusApiBaseQuery,
  endpoints: (builder) => ({
    getConfigSpec: builder.query<any, null>({
      query: () => `/eth/v1/config/spec`,
      transformResponse: (response: { data: any }) => response.data,
    }),
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
    getBlockEvents: builder.query<BlockEvent[], null>({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        await consensusWS.isConnected()
        let listener
        try {
          await cacheDataLoaded
          listener = (message: MessageEvent) => {
            const data = JSON.parse(message.data)
            updateCachedData((draft) => {
              console.log('debug getSlots updateCachedData draft', data)
              draft.unshift(data)
            })
          }
          consensusWS.subscribeToBlockEvents(listener)
        } catch (e) {
          console.error(e)
        }
        console.log('debug getSlots await cacheEntryRemoved')
        await cacheEntryRemoved
        if (listener) {
          consensusWS.unsubscribeToBlockEvents(listener)
        }
      },
    }),
  }),
})

type CustomerErrorType = {
  message: 'custom api failed'
}
// const blockHeaderAdapter = createEntityAdapter<BlockHeader>()

export const RtkqExecutionWs = createApi({
  reducerPath: 'RtkqExecutionWs',
  baseQuery: fakeBaseQuery<CustomerErrorType>(),
  endpoints: (builder) => ({
    getExecutionChainId: builder.query<any, null>({
      queryFn: async () => {
        return { data: await executionWS.getChainId() }
      },
    }),
    getExecutionLatestBlock: builder.query<any, null>({
      queryFn: async () => {
        const block = await executionWS.getLatestBlock()
        return { data: block }
      },
    }),
    getExecutionBlock: builder.query<any, string>({
      queryFn: async (blockId) => {
        const block = await executionWS.getBlock(blockId)
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
    getExecutionBlockHeaders: builder.query<BlockHeader[], null>({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        await executionWS.isConnected()
        let subscription
        let listener
        try {
          await cacheDataLoaded
          listener = (error: any, data: any) => {
            console.log('debug getExecutionBlockHeaders listener data', data)
            console.error(error)
            updateCachedData((draft) => {
              console.log('debug getExecutionBlockHeaders updateCachedData draft', draft)
              draft.unshift(data)
            })
          }
          subscription = executionWS.subscribeToBlockHeaders(listener)
        } catch (e) {
          console.error(e)
        }
        console.log('debug getExecutionBlockHeaders await cacheEntryRemoved')
        await cacheEntryRemoved
        if (subscription) {
          subscription.unsubscribe(listener)
        }
      },
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetBlockQuery,
  useGetIsSyncingQuery,
  useGetNetworkInfoQuery,
  useGetConfigSpecQuery,
  useGetBlockEventsQuery,
} = RtkqConsensusApi
export const {
  useGetExecutionBlockQuery,
  useGetExecutionIsSyncingQuery,
  useGetExecutionNetworkInfoQuery,
  useGetExecutionChainIdQuery,
  useGetExecutionBlockHeadersQuery,
} = RtkqExecutionWs
