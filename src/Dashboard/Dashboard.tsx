import {
  useGetConfigSpecQuery,
  useGetBlockQuery,
  useGetExecutionBlockQuery,
  useGetExecutionChainIdQuery,
  useGetExecutionBlockHeadersQuery,
  useGetBlockEventsQuery,
} from '../state/services'
import { selectNumRefreshClientDataInterval } from '../state/settings'
import { useAppSelector } from '../state/hooks'
import DashboardPresentational from './DashboardPresentational'

export default function Dashboard() {
  const rsNumRefreshClientDataInterval = useAppSelector(selectNumRefreshClientDataInterval)
  const { data, error, isLoading } = useGetBlockQuery('head', {
    pollingInterval: rsNumRefreshClientDataInterval,
  })
  const qExecutionBlockQuery = useGetExecutionBlockQuery('latest', {
    pollingInterval: rsNumRefreshClientDataInterval,
  })
  const qGetExecutionChainIdQuery = useGetExecutionChainIdQuery(null, {
    pollingInterval: rsNumRefreshClientDataInterval,
  })
  const qGetConfigSpecQuery = useGetConfigSpecQuery(null, {
    pollingInterval: rsNumRefreshClientDataInterval,
  })
  const qGetExecutionBlockHeadersQuery = useGetExecutionBlockHeadersQuery(null)
  const qGetBlockEventsQuery = useGetBlockEventsQuery(null)

  return (
    <div>
      <DashboardPresentational
        chainId={qGetExecutionChainIdQuery?.data}
        currBlockNum={qExecutionBlockQuery?.data?.number}
        currSlotNum={data?.slot}
        currentTotalTerminalDifficulty={qExecutionBlockQuery?.data?.totalDifficulty}
        mergeTotalTerminalDifficulty={qGetConfigSpecQuery?.data?.TERMINAL_TOTAL_DIFFICULTY}
        blockHeaders={
          qGetExecutionBlockHeadersQuery?.data ? qGetExecutionBlockHeadersQuery.data : []
        }
        blockEvents={qGetBlockEventsQuery?.data ? qGetBlockEventsQuery.data : []}
      />
    </div>
  )
}
