import { useEffect, useState } from 'react'
import { isMergeCompleted } from '../utils/isMergeCompleted'
import { consensusAPI } from '../App'
import { Block } from 'web3-eth'
import {
  useGetBlockQuery,
  useGetExecutionBlockQuery,
  useGetExecutionChainIdQuery,
} from '../state/services'
import { selectNumRefreshClientDataInterval } from '../state/settings'
import { useAppSelector } from '../state/hooks'
import DashboardPresentational from './DashboardPresentational'

export default function Dashboard() {
  const [sConsensusNodeConfigSpec, setConsensusNodeConfigSpec] = useState<any>()
  const [sLatestBlock, setLatestBlock] = useState<Block>()
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

  useEffect(() => {
    getConsensusNodeConfigSpec()
  }, [])

  const getConsensusNodeConfigSpec = async () => {
    try {
      const nodeInfo = await consensusAPI.getConfigSpec()
      setConsensusNodeConfigSpec(nodeInfo)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div>
      <DashboardPresentational
        chainId={qGetExecutionChainIdQuery?.data}
        currBlockNum={qExecutionBlockQuery?.data?.number}
        currSlotNum={data?.slot}
        currentTotalTerminalDifficulty={qExecutionBlockQuery?.data?.totalDifficulty}
        mergeTotalTerminalDifficulty={sConsensusNodeConfigSpec?.data?.TERMINAL_TOTAL_DIFFICULTY}
      />
    </div>
  )
}
