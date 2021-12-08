import { useEffect, useState } from 'react'
import * as ConsensusAPI from '../ConsensusAPI'
import { isMergeCompleted } from '../isMergeCompleted'
import { executionWS } from '../App'

// interface MergeProps {
//   executionWS: ExecutionWS
// }

export default function TheMerge() {
  // const [sConsensusNodeConfigSpec, setConsensusNodeConfigSpec] = useState<any>()
  const [sIsMergeComplete, setIsMergeComplete] = useState<boolean>()

  useEffect(() => {
    checkLatestBlockToSeeIfMergeIsCompleted()
  }, [])

  const checkLatestBlockToSeeIfMergeIsCompleted = async () => {
    try {
      if (executionWS) {
        const latestBlock = await executionWS.getLatestBlock()
        console.log('latest block received: ', latestBlock)
        setIsMergeComplete(isMergeCompleted(latestBlock))
      }
    } catch (e) {
      console.error(e)
    }
  }

  // const getConsensusNodeConfigSpec = async () => {
  //   console.log("appjs getConsensusNodeInfo")
  //   const nodeInfo = await ConsensusAPI.getConfigSpec()
  //   setConsensusNodeConfigSpec(nodeInfo)
  // }

  return (
    <div>
      <div>
        <h1>The MERGE</h1>
        {sIsMergeComplete !== null && (
          <>
            {sIsMergeComplete ? (
              <>
                <h2>IS COMPLETED</h2>
              </>
            ) : (
              <>
                <h2>COUNTDOWN</h2>
              </>
            )}
          </>
        )}
      </div>
      {/* <p>
            Merged at Terminal Total Difficulty: {sConsensusNodeConfigSpec?.data?.TERMINAL_TOTAL_DIFFICULTY}
          </p> */}
    </div>
  )
}
