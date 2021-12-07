import { FormEvent, useEffect, useState } from 'react'
import wait from 'wait'
import ClientConnectionError from './ClientConnectionError'
import { Tag, Intent, FormGroup, InputGroup, Dialog, Icon, Classes, Code } from '@blueprintjs/core'
import { IconName } from '@blueprintjs/icons'
import Constants from './Constants.json'
import { executionWS, consensusAPI } from './App'

interface ClientsProps {
  executionWS: any
  consensusAPI: any
}

export default function Clients(props: ClientsProps) {
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
    }, Constants.default_refresh_client_data_interval)
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
    const isConnected = await props.executionWS.isConnected()
    console.log('Clients ec is connected: ', isConnected)
    setIsEcConnected(isConnected)
  }
  const checkCcConnection = async () => {
    setIsCcConnected(await props.consensusAPI.isConnected())
  }

  const getConsensusNodeInfo = async () => {
    console.log('appjs getConsensusNodeInfo')
    const nodeInfo = await props.consensusAPI.getNodeInfo()
    setConsensusNodeInfo(nodeInfo)
  }

  const getExecutionNodeInfo = async () => {
    console.log('appjs getExecutionNodeInfo')
    const nodeInfo = await props.executionWS.getNodeInfo()
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
          <strong>Execution client:</strong> {sNodeInfo}{' '}
        </span>
        {!sIsEcConnected && (
          <>
            <Tag
              intent={Intent.DANGER}
              large={true}
              interactive={true}
              onClick={() => setIsOpenEcTroubleshootingOverlay(true)}
            >
              Not connected <Icon icon={'info-sign' as IconName} />
            </Tag>
            <Dialog
              title={'Execution client requirements'}
              isOpen={sIsOpenEcTroubleshootingOverlay}
              onClose={() => setIsOpenEcTroubleshootingOverlay(false)}
            >
              <div className={Classes.DIALOG_BODY}>
                <ul>
                  <li>
                    Enable http and websockets. <Code>--http --ws</Code>
                  </li>
                  <li>
                    Ensure Ethvis can connect to execution client on localhost. If the client is running as a docker
                    container, set the network flag to host. <Code>--network host</Code>, or in the docker compose file{' '}
                    <Code>network: host</Code>
                  </li>
                </ul>
              </div>
            </Dialog>
            {/* <Button
              minimal={false}
              icon={'info-sign' as IconName}
              onClick={() => setIsOpenEcTroubleshootingOverlay(true)}
            ></Button> */}
          </>
        )}
        <FormGroup
          label="Execution Client's websocket endpoint"
          labelFor="text-input"
          labelInfo="(required)"
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
      </div>
      <div>
        <span>
          {/* isSyncing:{' '} {sIsEcSyncing !== undefined && sIsEcSyncing.toString()} */}
          <strong>Consensus client:</strong> {sConsensusNodeInfo}
        </span>
        {!sIsCcConnected && (
          <>
            <Tag
              intent={Intent.DANGER}
              large={true}
              interactive={true}
              onClick={() => setIsOpenCcTroubleshootingOverlay(true)}
            >
              Not connected <Icon icon={'info-sign' as IconName} />
            </Tag>
            <Dialog
              title={'Consensus client requirements'}
              isOpen={sIsOpenCcTroubleshootingOverlay}
              onClose={() => setIsOpenCcTroubleshootingOverlay(false)}
            >
              <div className={Classes.DIALOG_BODY}>
                <ul>
                  <li>
                    Enable http and websockets. <Code>--http --ws</Code>
                  </li>
                  <li>
                    Ensure {Constants.product_name} can connect to execution client on localhost. If the client is
                    running as a docker container, set the network flag to host. <Code>--network host</Code>, or in the
                    docker compose file <Code>network: host</Code>. Additionally, allow the UI to connect to the
                    consensus client by tell the consensus client the http origin of the UI using{' '}
                    <Code>--http-allow-origin http://localhost:3000</Code>
                  </li>
                </ul>
              </div>
            </Dialog>
          </>
        )}
        <FormGroup
          label="Consensus Client's http endpoint"
          labelFor="text-input"
          labelInfo="(required)"
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
      {(!sIsCcConnected || !sIsEcConnected) && <ClientConnectionError />}
    </div>
  )
}
