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
  }),
})

type CustomerErrorType = {
  message: "custom api failed"
}

export const RtkqExecutionWs = createApi({
  reducerPath: 'RtkqExecutionWs',
  baseQuery: fakeBaseQuery<CustomerErrorType>(),
  endpoints: (builder) => ({
    getExecutionBlock: builder.query<any, string>({
      queryFn: async (blockId) => {
        console.log("RtkqExecutionWs queryFn blockId: ", blockId)
        const block = await executionWS.getLatestBlock()
        console.log("RtkqExecutionWs queryFn block: ", block)
        return { data: block }
      }
    }),
  }),
})


// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetBlockQuery } = RtkqConsensusApi 
export const { useGetExecutionBlockQuery } = RtkqExecutionWs
