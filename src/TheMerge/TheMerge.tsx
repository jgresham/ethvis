import { useEffect, useState } from 'react'
import { isMergeCompleted } from '../utils/isMergeCompleted'
import { executionWS, consensusAPI } from '../App'
import { useInterval } from 'usehooks-ts'
import { Block } from 'web3-eth'
import { numLocale } from '../utils/stringsAndNums'
import { useGetBlockQuery } from '../state/services'
import { selectNumRefreshClientDataInterval } from '../state/settings'
import { useAppSelector } from '../state/hooks'

export default function TheMerge() {
  const [sConsensusNodeConfigSpec, setConsensusNodeConfigSpec] = useState<any>()
  const [sLatestBlock, setLatestBlock] = useState<Block>()
  const [sIsMergeComplete, setIsMergeComplete] = useState<boolean>()
  const rsNumRefreshClientDataInterval = useAppSelector(selectNumRefreshClientDataInterval)
  const { data, error, isLoading } = useGetBlockQuery('head', {
    pollingInterval: rsNumRefreshClientDataInterval,
  })

  useEffect(() => {
    checkLatestBlockToSeeIfMergeIsCompleted()
    getConsensusNodeConfigSpec()
  }, [])

  useInterval(() => {
    checkLatestBlockToSeeIfMergeIsCompleted()
  }, rsNumRefreshClientDataInterval)

  const checkLatestBlockToSeeIfMergeIsCompleted = async () => {
    try {
      if (executionWS) {
        const latestBlock = await executionWS.getLatestBlock()
        setLatestBlock(latestBlock)
        console.log('latest block received: ', latestBlock)
        setIsMergeComplete(isMergeCompleted(latestBlock))
      }
    } catch (e) {
      console.error(e)
    }
  }

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
      <div>
        <h1>The MERGE</h1>
        {sIsMergeComplete !== null && (
          <>
            {sIsMergeComplete ? (
              <>
                <h2>IS COMPLETED</h2>
                <h3>The latest block difficulty is 0 ... Goodbye PoW</h3>
              </>
            ) : (
              <>
                <h2>COUNTDOWN</h2>
              </>
            )}
          </>
        )}
      </div>
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
    </div>
  )
}
