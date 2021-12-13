import { useState } from 'react'
import { Dialog, Button, Classes, Code, DialogProps } from '@blueprintjs/core'
import EDialog from '../CommonComponents/EDialog'
import SetClients from './SetClients'

export default function ConnectClientsDialog(props: DialogProps) {
  return (
    <EDialog title={'Connect Ethereum Clients'} {...props}>
      <SetClients />
    </EDialog>
  )
}
