import { DialogProps } from '@blueprintjs/core'
import EDialog from '../CommonComponents/EDialog'
import SetClients from './SetClients'
import InputRefreshClientDataInterval from './InputRefreshClientDataInterval'

export default function ConnectClientsDialog(props: DialogProps) {
  return (
    <EDialog title={'Connect Ethereum Clients'} {...props}>
      <SetClients />
      <InputRefreshClientDataInterval />
    </EDialog>
  )
}
