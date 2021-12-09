import { useEffect, useState } from 'react'
import * as ConsensusAPI from '../ConsensusAPI'
import { isMergeCompleted } from '../utils/isMergeCompleted'
import { executionWS, consensusAPI } from '../App'
import { useInterval } from 'usehooks-ts'
import Constants from '../Constants.json'
import { BlockHeader, Block } from 'web3-eth'
import { numLocale } from '../utils/stringsAndNums'

export default function TheMerge() {
  const [sConsensusNodeConfigSpec, setConsensusNodeConfigSpec] = useState<any>()
  const [sLatestBlock, setLatestBlock] = useState<Block>()
  const [sIsMergeComplete, setIsMergeComplete] = useState<boolean>()

  useEffect(() => {
    checkLatestBlockToSeeIfMergeIsCompleted()
    getConsensusNodeConfigSpec()
  }, [])

  useInterval(() => {
    checkLatestBlockToSeeIfMergeIsCompleted()
  }, Constants.default_refresh_client_data_interval_ms)

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
    const nodeInfo = await consensusAPI.getConfigSpec()
    setConsensusNodeConfigSpec(nodeInfo)
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
    </div>
  )
}
