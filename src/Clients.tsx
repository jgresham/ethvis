import { useEffect, useState } from 'react'
import wait from 'wait'
import ClientConnectionError from './ClientConnectionError'
import { Tag, Intent, Button, Dialog, Icon, Classes, Code } from '@blueprintjs/core'
import { IconName } from '@blueprintjs/icons'
import Constants from './Constants.json'

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
  }, [])

  const getClientInfo = () => {
    getConsensusNodeInfo()
    getExecutionNodeInfo()
    checkEcConnection()
    checkCcConnection()
  }

  const checkEcConnection = async () => {
    setIsEcConnected(await props.executionWS.isConnected())
    setIsEcSyncing(await props.executionWS.isSyncing())
    wait(5000)
    setIsEcConnected(await props.executionWS.isConnected())
    setIsEcSyncing(await props.executionWS.isSyncing())
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

  return (
    <div>
      <p>
        <strong>Execution client:</strong> {sNodeInfo}{' '}
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
        {/* isSyncing:{' '} {sIsEcSyncing !== undefined && sIsEcSyncing.toString()} */}
        <strong>Consensus client:</strong> {sConsensusNodeInfo}
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
                    docker compose file <Code>network: host</Code>
                  </li>
                </ul>
              </div>
            </Dialog>
          </>
        )}
      </p>
      {(!sIsCcConnected || !sIsEcConnected) && <ClientConnectionError />}
    </div>
  )
}
