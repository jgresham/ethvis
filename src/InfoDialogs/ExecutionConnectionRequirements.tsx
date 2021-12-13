import { useState } from 'react'
import { Dialog, Button, Classes, Code, DialogProps } from '@blueprintjs/core'
import EDialog from '../CommonComponents/EDialog'
import Constants from '../Constants.json'

export default function ExecutionConnectionRequirements(props: DialogProps) {
  return (
    <EDialog title={'Execution client requirements'} {...props}>
      <ul>
        <li>
          Enable the client's websocket server by passing the runtime flag. Please refer to your
          execution client's documentation. Ex. For Geth pass <Code> --ws</Code>. For Netermind pass{' '}
          <Code>
            --Init.WebSocketsEnabled=true --JsonRpc.Enabled=true
            --JsonRpc.EnabledModules="net,eth,consensus,engine" --JsonRpc.Port=8545
            --JsonRpc.WebSocketsPort=8546 --JsonRpc.Host=0.0.0.0
          </Code>
          .
        </li>
        <li>
          Ensure {Constants.product_name} can connect to execution client on localhost. If the
          client is running as a docker container, set the network flag to host.{' '}
          <Code>--network host</Code>, or in the docker compose file <Code>network: host</Code>
        </li>
      </ul>
    </EDialog>
  )
}
