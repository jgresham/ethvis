import { useEffect, useState } from 'react'
import wait from 'wait'
import { Tag, Intent, FormGroup, InputGroup, Icon } from '@blueprintjs/core'
import { IconName } from '@blueprintjs/icons'
import Constants from '../Constants.json'
import { executionWS, consensusAPI } from '../App'
import { detectExecutionClient, detectConsensusClient } from '../utils/detectClient'
import ExecutionConnectionRequirements from '../InfoDialogs/ExecutionConnectionRequirements'
import ConsensusConnectionRequirements from '../InfoDialogs/ConsensusConnectionRequirements'
import ConnectableText from '../CommonComponents/ConnectableText'
import {
  updateSettingsConsensusApiEndpoint,
  updateSettingsExecutionWsEndpoint,
} from '../state/settings'
import { useAppDispatch, useAppSelector } from '../state/hooks'

export default function SetClients() {
  const dispatch = useAppDispatch()
  const [sIsEcConnected, setIsEcConnected] = useState<boolean>()
  const [sIsCcConnected, setIsCcConnected] = useState<boolean>()
  const [sNodeInfo, setNodeInfo] = useState<string>()
  const [sConsensusNodeInfo, setConsensusNodeInfo] = useState<string>()
  const [sIsOpenEcTroubleshootingOverlay, setIsOpenEcTroubleshootingOverlay] =
    useState<boolean>(false)
  const [sIsOpenCcTroubleshootingOverlay, setIsOpenCcTroubleshootingOverlay] =
    useState<boolean>(false)
  const rsExecutionWsEndpoint = useAppSelector((state) => state.settings.executionWs)
  const rsConsensusApiEndpoint = useAppSelector((state) => state.settings.consensusApi)

  useEffect(() => {
    getClientInfo()
    const interval = setInterval(() => {
      getClientInfo()
    }, Constants.default_refresh_client_data_interval_ms)
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
    console.log('Clients ec is connected: ', isConnected)
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
  const onCcEndpointChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndpoint = e.target.value
    dispatch(updateSettingsConsensusApiEndpoint(newEndpoint))
    checkCcConnection()
  }
  const onEcEndpointChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndpoint = e.target.value
    console.log('onEcEndpointChange', newEndpoint)
    dispatch(updateSettingsExecutionWsEndpoint(newEndpoint))
    checkEcConnection()
  }

  return (
    <div>
      <div>
        <h3>Execution:</h3>
        {!sIsEcConnected && (
          <>
            <Tag
              intent={Intent.DANGER}
              large={true}
              interactive={true}
              onClick={() => setIsOpenEcTroubleshootingOverlay(true)}
            >
              <Icon icon={'info-sign' as IconName} />
            </Tag>
            <ExecutionConnectionRequirements
              isOpen={sIsOpenEcTroubleshootingOverlay}
              onClose={() => setIsOpenEcTroubleshootingOverlay(false)}
            />
          </>
        )}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FormGroup
            label="websocket endpoint"
            labelFor="text-input"
            labelInfo="*"
            inline={true}
            style={{ display: 'inline-block' }}
          >
            <InputGroup
              id="text-input"
              asyncControl={true}
              value={rsExecutionWsEndpoint}
              onChange={onEcEndpointChange}
            />
          </FormGroup>
          {sIsEcConnected && (
            <ConnectableText
              text={detectExecutionClient(sNodeInfo)}
              hoverText={sNodeInfo}
              isConnected={sIsEcConnected}
            />
          )}
        </div>
      </div>
      <div>
        <span>
          <h3>Consensus:</h3>
        </span>
        {!sIsCcConnected && (
          <>
            <Tag
              intent={Intent.DANGER}
              large={true}
              interactive={true}
              onClick={() => setIsOpenCcTroubleshootingOverlay(true)}
            >
              <Icon icon={'info-sign' as IconName} />
            </Tag>
            <ConsensusConnectionRequirements
              isOpen={sIsOpenCcTroubleshootingOverlay}
              onClose={() => setIsOpenCcTroubleshootingOverlay(false)}
            />
          </>
        )}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FormGroup
            label="http endpoint"
            labelFor="text-input"
            labelInfo="*"
            inline={true}
            style={{ display: 'inline-block' }}
          >
            <InputGroup
              id="text-input"
              asyncControl={true}
              value={rsConsensusApiEndpoint}
              onChange={onCcEndpointChange}
            />
          </FormGroup>
          {sIsCcConnected && (
            <ConnectableText
              text={detectConsensusClient(sConsensusNodeInfo)}
              hoverText={sConsensusNodeInfo}
              isConnected={sIsCcConnected}
            />
          )}
        </div>
      </div>
    </div>
  )
}
