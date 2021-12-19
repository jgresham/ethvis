import { Code, DialogProps, Pre } from '@blueprintjs/core'
import EDialog from '../CommonComponents/EDialog'
import Constants from '../Constants.json'

export default function ConsensusConnectionRequirements(props: DialogProps) {
  return (
    <EDialog title={'Consensus client requirements'} {...props}>
      Lighthouse example run command
      <Pre style={{ whiteSpace: 'pre-wrap' }}>
        docker run -d -v lighthouse-volume:/root/.lighthouse --name beacon --restart always
        --network host sigp/lighthouse lighthouse --network mainnet beacon --http --http-address
        0.0.0.0 --http-allow-origin https://ethvis.xyz,http://localhost:3000
      </Pre>
      <ul>
        <li>
          Enable the consensus client's http server by passing the runtime flag <Code>--http</Code>
        </li>
        <li>
          Enable {Constants.product_name} to connect to the execution client by telling the client
          the origin <Code>https://ethvis.xyz</Code> is allowed to connect. Ex. For Geth pass{' '}
          <Code>--http-allow-origin https://ethvis.xyz</Code>, or if you also want to run EthVis
          locally <Code>--http-allow-origin https://ethvis.xyz,http://localhost:3000</Code>
        </li>
        <li>
          Ensure {Constants.product_name} can connect to execution client on localhost. If the
          client is running as a docker container, set the network flag to host.{' '}
          <Code>--network host</Code>, or in the docker compose file <Code>network: host</Code>.
          Additionally, allow the UI to connect to the consensus client by tell the consensus client
          the http origin of the UI using <Code>--http-allow-origin http://localhost:3000</Code>
        </li>
      </ul>
    </EDialog>
  )
}
