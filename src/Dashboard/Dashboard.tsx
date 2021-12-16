import { useEffect, useState } from 'react'
import { isMergeCompleted } from '../utils/isMergeCompleted'
import { executionWS, consensusAPI } from '../App'
import { useInterval } from 'usehooks-ts'
import { Block } from 'web3-eth'
import { numLocale } from '../utils/stringsAndNums'
import { useGetBlockQuery, useGetExecutionBlockQuery } from '../state/services'
import { selectNumRefreshClientDataInterval } from '../state/settings'
import { useAppSelector } from '../state/hooks'

export default function Dashboard() {
  const [sConsensusNodeConfigSpec, setConsensusNodeConfigSpec] = useState<any>()
  const [sLatestBlock, setLatestBlock] = useState<Block>()
  const rsNumRefreshClientDataInterval = useAppSelector(selectNumRefreshClientDataInterval)
  const { data, error, isLoading } = useGetBlockQuery('head', {
    pollingInterval: rsNumRefreshClientDataInterval,
  })
  const executionBlockQuery = useGetExecutionBlockQuery('latest', {
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
      <p>
        Consensus client set to merge at (or after) Terminal Total Difficulty:{' '}
        {numLocale(sConsensusNodeConfigSpec?.data?.TERMINAL_TOTAL_DIFFICULTY)}
      </p>
      Current Terminal Total Difficulty {numLocale(sLatestBlock?.totalDifficulty)}
      <div>
        <p>Consensus latest slot:</p>
        {isLoading && <span>loading...</span>}
        {data && <span>{JSON.stringify(data.slot, null, 2)}</span>}
        {error && <span>Error + {JSON.stringify(error, null, 2)}</span>}
      </div>
      <div>
        <p>Execution latest block:</p>
        {executionBlockQuery.isLoading && <span>loading...</span>}
        {executionBlockQuery.data && <span>{JSON.stringify(executionBlockQuery.data, null, 2)}</span>}
        {executionBlockQuery.error && <span>Error + {JSON.stringify(executionBlockQuery.error, null, 2)}</span>}
      </div>
    </div>
  )
}
