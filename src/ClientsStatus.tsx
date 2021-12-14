import { useEffect, useState } from 'react'
import wait from 'wait'
import { Tag, Intent, Divider, Icon } from '@blueprintjs/core'
import { IconName } from '@blueprintjs/icons'
import Constants from './Constants.json'
import { executionWS, consensusAPI } from './App'
import { detectExecutionClient, detectConsensusClient } from './utils/detectClient'
import ConsensusConnectionRequirements from './InfoDialogs/ConsensusConnectionRequirements'
import ExecutionConnectionRequirements from './InfoDialogs/ExecutionConnectionRequirements'
import ConnectableText from './CommonComponents/ConnectableText'
import { useAppSelector } from './state/hooks'
import { selectNumRefreshClientDataInterval } from './state/settings'

export default function ClientsStatus() {
  const [sIsEcConnected, setIsEcConnected] = useState<boolean>()
  const [sIsCcConnected, setIsCcConnected] = useState<boolean>()
  const [sIsEcSyncing, setIsEcSyncing] = useState<boolean>()
  const [sNodeInfo, setNodeInfo] = useState<string>()
  const [sConsensusNodeInfo, setConsensusNodeInfo] = useState<string>()
  const [sIsOpenEcTroubleshootingOverlay, setIsOpenEcTroubleshootingOverlay] =
    useState<boolean>(false)
  const [sIsOpenCcTroubleshootingOverlay, setIsOpenCcTroubleshootingOverlay] =
    useState<boolean>(false)
  const rsNumRefreshClientDataInterval = useAppSelector(selectNumRefreshClientDataInterval)

  useEffect(() => {
    getClientInfo()
    const interval = setInterval(() => {
      getClientInfo()
    }, rsNumRefreshClientDataInterval)
    return () => clearInterval(interval)
  }, [])

  const getClientInfo = () => {
    getConsensusNodeInfo()
    getExecutionNodeInfo()
    checkEcConnection()
    checkCcConnection()
    wait(5000)
    checkEcConnection()
    checkCcConnection()
  }

  const checkEcConnection = async () => {
    const isConnected = await executionWS.isConnected()
    console.log('ClientsStatus ec is connected: ', isConnected)
    setIsEcConnected(isConnected)
  }
  const checkCcConnection = async () => {
    setIsCcConnected(await consensusAPI.isConnected())
  }

  const getConsensusNodeInfo = async () => {
    const nodeInfo = await consensusAPI.getNodeInfo()
    setConsensusNodeInfo(nodeInfo)
  }

  const getExecutionNodeInfo = async () => {
    console.log('appjs getExecutionNodeInfo')
    const nodeInfo = await executionWS.getNodeInfo()
    setNodeInfo(nodeInfo)
  }

  const executionClientText = sIsEcConnected ? detectExecutionClient(sNodeInfo) : 'Execution client'
  const consensusClientText = sIsCcConnected
    ? detectConsensusClient(sConsensusNodeInfo)
    : 'Consensus client'

  return (
    <div style={{ display: 'flex' }}>
      <ConnectableText
        text={executionClientText}
        hoverText={sNodeInfo}
        isConnected={sIsEcConnected}
      />
      {!sIsEcConnected && (
        <>
          <Tag
            intent={Intent.DANGER}
            large={true}
            interactive={true}
            onClick={() => setIsOpenEcTroubleshootingOverlay(true)}
          >
            <Icon icon={'info-sign' as IconName} />
            <span style={{ paddingLeft: 5 }}>Disconnected</span>
          </Tag>
          <ExecutionConnectionRequirements
            isOpen={sIsOpenEcTroubleshootingOverlay}
            onClose={() => setIsOpenEcTroubleshootingOverlay(false)}
          />
        </>
      )}
      &ensp;
      <Divider />
      &ensp;
      <ConnectableText
        text={consensusClientText}
        hoverText={sConsensusNodeInfo}
        isConnected={sIsCcConnected}
      />
      {/* isSyncing:{' '} {sIsEcSyncing !== undefined && sIsEcSyncing.toString()} */}
      {!sIsCcConnected && (
        <>
          <Tag
            intent={Intent.DANGER}
            large={true}
            interactive={true}
            onClick={() => setIsOpenCcTroubleshootingOverlay(true)}
          >
            <Icon icon={'info-sign' as IconName} />
            <span style={{ paddingLeft: 5 }}>Disconnected</span>
          </Tag>
          <ConsensusConnectionRequirements
            isOpen={sIsOpenCcTroubleshootingOverlay}
            onClose={() => setIsOpenCcTroubleshootingOverlay(false)}
          />
        </>
      )}
    </div>
  )
}
