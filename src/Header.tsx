import { useState } from 'react'

import styled from 'styled-components/macro'
import Constants from './Constants.json'
import UniButton from './CommonComponents/UniButton'
import mainLogo from './images/ethvislogo.png'
import DarkModeButton from './CommonComponents/DarkModeButton'
import ConnectClientsDialog from './Settings/ConnectClientsDialog'
import ClientsStatus from './ClientsStatus'
import { useAppSelector } from './state/hooks'
import { selectNumRefreshClientDataInterval } from './state/settings'

const HeaderDiv = styled.div`
  height: 54px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-color: #5c7080;
`

export default function Header() {
  const [sIsOpenConnectClientsDialog, setIsOpenConnectClientsDialog] = useState<boolean>(false)
  const rsNumRefreshClientDataInterval = useAppSelector(selectNumRefreshClientDataInterval)

  return (
    <HeaderDiv>
      <img src={mainLogo} style={{ height: '100%' }} alt="ethvis logo" />
      <span>{Constants.product_name}</span>
      <div style={{ marginLeft: 'auto' }}>
        <ClientsStatus />
      </div>
      <span style={{ marginLeft: 'auto' }}>
        Refreshing data every {rsNumRefreshClientDataInterval / 1000}s
      </span>
      <div style={{ marginLeft: 'auto', display: 'flex' }}>
        <DarkModeButton />
        <UniButton onClick={() => setIsOpenConnectClientsDialog(true)}>Connect Clients</UniButton>
        <ConnectClientsDialog
          isOpen={sIsOpenConnectClientsDialog}
          onClose={() => setIsOpenConnectClientsDialog(false)}
        />
      </div>
    </HeaderDiv>
  )
}
