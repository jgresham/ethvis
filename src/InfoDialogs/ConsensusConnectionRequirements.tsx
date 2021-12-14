import { Code, DialogProps } from '@blueprintjs/core'
import EDialog from '../CommonComponents/EDialog'
import Constants from '../Constants.json'

export default function ConsensusConnectionRequirements(props: DialogProps) {
  return (
    <EDialog title={'Consensus client requirements'} {...props}>
      <ul>
        <li>
          Enable the consensus client's http server by passing the runtime flag <Code>--http</Code>
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
