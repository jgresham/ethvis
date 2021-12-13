import { FormEvent, useEffect, useState } from 'react'
import wait from 'wait'
import ClientConnectionError from './ClientConnectionError'
import { Tag, Intent, FormGroup, InputGroup, Dialog, Icon, Classes, Code } from '@blueprintjs/core'
import { IconName } from '@blueprintjs/icons'
import Constants from './Constants.json'
import { executionWS, consensusAPI } from './App'
import { detectExecutionClient, detectConsensusClient } from './utils/detectClient'

export default function Clients() {
  const [sIsEcConnected, setIsEcConnected] = useState<boolean>()
  const [sIsCcConnected, setIsCcConnected] = useState<boolean>()
  const [sIsEcSyncing, setIsEcSyncing] = useState<boolean>()
  const [sNodeInfo, setNodeInfo] = useState<string>()
  const [sConsensusNodeInfo, setConsensusNodeInfo] = useState<string>()
  const [sIsOpenEcTroubleshootingOverlay, setIsOpenEcTroubleshootingOverlay] = useState<boolean>()
  const [sIsOpenCcTroubleshootingOverlay, setIsOpenCcTroubleshootingOverlay] = useState<boolean>()

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
    consensusAPI.changeEndpoint(newEndpoint)
    checkCcConnection()
  }
  const onEcEndpointChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndpoint = e.target.value
    executionWS.changeEndpoint(newEndpoint)
    checkEcConnection()
  }

  return (
    <div>
      <div>
        <span>
          Execution: <strong>{detectExecutionClient(sNodeInfo)}</strong>{' '}
        </span>
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
            <Dialog
              title={'Execution client requirements'}
              isOpen={sIsOpenEcTroubleshootingOverlay}
              onClose={() => setIsOpenEcTroubleshootingOverlay(false)}
            >
              <div className={Classes.DIALOG_BODY}>
                <ul>
                  <li>
                    Enable the client's websocket server by passing the runtime flag. Please refer
                    to your execution client's documentation. Ex. For Geth pass <Code> --ws</Code>.
                    For Netermind pass{' '}
                    <Code>
                      --Init.WebSocketsEnabled=true --JsonRpc.Enabled=true
                      --JsonRpc.EnabledModules="net,eth,consensus,engine" --JsonRpc.Port=8545
                      --JsonRpc.WebSocketsPort=8546 --JsonRpc.Host=0.0.0.0
                    </Code>
                    .
                  </li>
                  <li>
                    Ensure Ethvis can connect to execution client on localhost. If the client is
                    running as a docker container, set the network flag to host.{' '}
                    <Code>--network host</Code>, or in the docker compose file{' '}
                    <Code>network: host</Code>
                  </li>
                </ul>
              </div>
            </Dialog>
          </>
        )}
        <FormGroup
          label="websocket endpoint"
          labelFor="text-input"
          labelInfo="*"
          inline={true}
          style={{ display: 'inline-block' }}
        >
          <InputGroup
            id="text-input"
            defaultValue={Constants.default_execution_client_websocket_endpoint}
            placeholder={Constants.default_execution_client_websocket_endpoint}
            onChange={onEcEndpointChange}
          />
        </FormGroup>
        {/* </div>
      <div> */}
        <span>
          {/* isSyncing:{' '} {sIsEcSyncing !== undefined && sIsEcSyncing.toString()} */}
          Consensus:<strong> {detectConsensusClient(sConsensusNodeInfo)}</strong>
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
            <Dialog
              title={'Consensus client requirements'}
              isOpen={sIsOpenCcTroubleshootingOverlay}
              onClose={() => setIsOpenCcTroubleshootingOverlay(false)}
            >
              <div className={Classes.DIALOG_BODY}>
                <ul>
                  <li>
                    Enable the consensus client's http server by passing the runtime flag{' '}
                    <Code>--http</Code>
                  </li>
                  <li>
                    Ensure {Constants.product_name} can connect to execution client on localhost. If
                    the client is running as a docker container, set the network flag to host.{' '}
                    <Code>--network host</Code>, or in the docker compose file{' '}
                    <Code>network: host</Code>. Additionally, allow the UI to connect to the
                    consensus client by tell the consensus client the http origin of the UI using{' '}
                    <Code>--http-allow-origin http://localhost:3000</Code>
                  </li>
                </ul>
              </div>
            </Dialog>
          </>
        )}
        <FormGroup
          label="http endpoint"
          labelFor="text-input"
          labelInfo="*"
          inline={true}
          style={{ display: 'inline-block' }}
        >
          <InputGroup
            id="text-input"
            defaultValue={Constants.default_beacon_client_http_endpoint}
            placeholder={Constants.default_beacon_client_http_endpoint}
            onChange={onCcEndpointChange}
          />
        </FormGroup>
      </div>
      {/* {(!sIsCcConnected || !sIsEcConnected) && <ClientConnectionError />} */}
    </div>
  )
}
