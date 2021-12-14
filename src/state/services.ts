import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Constants from '../Constants.json'

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

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetBlockQuery } = RtkqConsensusApi
