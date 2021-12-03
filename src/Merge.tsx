import './App.scss'
import { useEffect, useState } from 'react'
import * as ConsensusAPI from './ConsensusAPI'
import { isMergeCompleted } from './isMergeCompleted'
import ExecutionWS from './ExecutionWS'

interface MergeProps {
  executionWS: ExecutionWS
}

export default function Merge(props: MergeProps) {
  // const [sConsensusNodeConfigSpec, setConsensusNodeConfigSpec] = useState<any>()
  const [sIsMergeComplete, setIsMergeComplete] = useState<boolean>()

  useEffect(() => {
    checkLatestBlockToSeeIfMergeIsCompleted()
  }, [props])

  const checkLatestBlockToSeeIfMergeIsCompleted = async () => {
    try {
      if (props.executionWS) {
        const latestBlock = await props.executionWS.getLatestBlock()
        console.log('latest block received: ', latestBlock)
        setIsMergeComplete(isMergeCompleted(latestBlock))
      }
    } catch (e) {
      console.error(e)
    }
  }

  // const getConsensusNodeConfigSpec = async () => {
  //   console.log("appjs getConsensusNodeInfo")
  //   const nodeInfo = await ConsensusAPI.getNodeConfigSpec()
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
