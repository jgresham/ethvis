import { Code, DialogProps, Pre } from '@blueprintjs/core'
import EDialog from '../CommonComponents/EDialog'
import Constants from '../Constants.json'

export default function ExecutionConnectionRequirements(props: DialogProps) {
  return (
    <EDialog title={'Execution client requirements'} {...props}>
      Geth example run command
      <Pre style={{ whiteSpace: 'pre-wrap' }}>
        docker run -d -v mainnet-geth-volume:/root/.ethereum --restart always -it --network host
        --name geth ethereum/client-go --ws --ws.origins https://ethvis.xyz,http://localhost:3000
        --ws.api "engine,net,eth,web3,subscribe,miner,txpool"
      </Pre>
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
          Enable {Constants.product_name} to connect to the execution client by telling the client
          the origin <Code>ethvis.xyz</Code> is allowed to connect. Ex. For Geth pass{' '}
          <Code>--ws.origins ethvis.xyz</Code>
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
