import { useEffect, useState } from 'react'
import wait from 'wait'
import { Divider } from '@blueprintjs/core'
import { executionWS, consensusAPI } from '../App'
import { detectExecutionClient, detectConsensusClient } from '../utils/detectClient'
import { useAppSelector } from '../state/hooks'
import { selectNumRefreshClientDataInterval } from '../state/settings'
import { useGetIsSyncingQuery, useGetExecutionIsSyncingQuery } from '../state/services'
import ClientStatusInline from '../CommonComponents/ClientStatusInline'

export default function ClientsStatuses() {
  const [sIsEcConnected, setIsEcConnected] = useState<boolean>()
  const [sIsCcConnected, setIsCcConnected] = useState<boolean>()
  const [sNodeInfo, setNodeInfo] = useState<string>()
  const [sConsensusNodeInfo, setConsensusNodeInfo] = useState<string>()
  const rsNumRefreshClientDataInterval = useAppSelector(selectNumRefreshClientDataInterval)
  const qExeuctionIsSyncing = useGetExecutionIsSyncingQuery(null, {
    pollingInterval: rsNumRefreshClientDataInterval,
  })
  const qConsensusIsSyncing = useGetIsSyncingQuery(null, {
    pollingInterval: rsNumRefreshClientDataInterval,
  })
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
    const nodeInfo = await executionWS.getNodeInfo()
    setNodeInfo(nodeInfo)
  }

  const executionClientText = sIsEcConnected ? detectExecutionClient(sNodeInfo) : 'Execution client'
  const consensusClientText = sIsCcConnected
    ? detectConsensusClient(sConsensusNodeInfo)
    : 'Consensus client'

  return (
    <div style={{ display: 'flex' }}>
      <ClientStatusInline
        clientDisplayName={executionClientText}
        clientVersion={sNodeInfo}
        isConnected={sIsEcConnected}
        isSyncing={qExeuctionIsSyncing.data}
        type={'execution'}
      />
      &ensp;
      <Divider />
      &ensp;
      <ClientStatusInline
        clientDisplayName={consensusClientText}
        clientVersion={sConsensusNodeInfo}
        isConnected={sIsCcConnected}
        isSyncing={qConsensusIsSyncing.data}
        type={'consensus'}
      />
    </div>
  )
}
